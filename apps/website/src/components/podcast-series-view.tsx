"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { PodcastItem } from "./podcasts-storefront";

type Labels = {
  episodes: string;
  episode: string;
  backToPodcasts: string;
  nowPlaying: string;
  play: string;
  pause: string;
  empty: string;
  listenVideo: string;
  listenAudio: string;
  chooseFormat: string;
};

type Props = {
  seriesTitle: string;
  seriesSlug: string;
  coverImageUrl: string | null;
  organizationName: string | null;
  episodes: PodcastItem[];
  locale: string;
  labels: Labels;
};

type ListenMode = "video" | "audio";

function pickVariant(item: PodcastItem, locale: string) {
  return item.variants.find((v) => v.locale === locale) ?? item.variants[0];
}

function youtubeIdFromAssets(
  assets: PodcastItem["variants"][number]["assets"] | undefined,
): string | null {
  if (!assets?.length) return null;
  for (const asset of assets) {
    const meta = asset.meta as { youtubeId?: string } | null;
    if (meta?.youtubeId) return meta.youtubeId;
    const m = asset.url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube-nocookie\.com\/embed\/)([\w-]{11})/,
    );
    if (m) return m[1];
  }
  return null;
}

function youtubeIdForItem(item: PodcastItem | null, locale: string): string | null {
  if (!item) return null;
  const preferred = item.variants.find((v) => v.locale === locale);
  return (
    youtubeIdFromAssets(preferred?.assets) ??
    item.variants.map((v) => youtubeIdFromAssets(v.assets)).find(Boolean) ??
    null
  );
}

function audioUrlFromAssets(
  assets: PodcastItem["variants"][number]["assets"] | undefined,
): string | null {
  if (!assets?.length) return null;
  for (const asset of assets) {
    if (asset.kind !== "audio") continue;
    if (/youtube\.com|youtu\.be/i.test(asset.url)) continue;
    return asset.url;
  }
  return null;
}

function audioUrlForItem(item: PodcastItem | null, locale: string): string | null {
  if (!item) return null;
  const preferred = item.variants.find((v) => v.locale === locale);
  return (
    audioUrlFromAssets(preferred?.assets) ??
    item.variants.map((v) => audioUrlFromAssets(v.assets)).find(Boolean) ??
    null
  );
}

function fileVideoUrlFromAssets(
  assets: PodcastItem["variants"][number]["assets"] | undefined,
): string | null {
  if (!assets?.length) return null;
  for (const asset of assets) {
    if (asset.kind !== "video") continue;
    if (/youtube\.com|youtu\.be/i.test(asset.url)) continue;
    const meta = asset.meta as { provider?: string } | null;
    if (meta?.provider === "youtube") continue;
    if (/\.(mp4|webm|ogg)(\?|$)/i.test(asset.url) || asset.url.startsWith("/video/")) {
      return asset.url;
    }
  }
  return null;
}

function fileVideoUrlForItem(
  item: PodcastItem | null,
  locale: string,
): string | null {
  if (!item) return null;
  const preferred = item.variants.find((v) => v.locale === locale);
  return (
    fileVideoUrlFromAssets(preferred?.assets) ??
    item.variants.map((v) => fileVideoUrlFromAssets(v.assets)).find(Boolean) ??
    null
  );
}

function formatDuration(seconds?: number | null) {
  if (seconds == null || !Number.isFinite(seconds) || seconds < 0) return null;
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatDate(value: Date | string | null, locale: string) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat(locale === "ku" ? "en-GB" : locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "";
  }
}

function Cover({
  src,
  title,
  className = "",
}: {
  src: string | null;
  title: string;
  className?: string;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" className={`object-cover ${className}`} />;
  }
  return (
    <div
      className={`flex items-end bg-oak-ink p-3 font-display text-oak-bone ${className}`}
    >
      <span className="line-clamp-3 text-sm">{title}</span>
    </div>
  );
}

export function PodcastSeriesView({
  seriesTitle,
  coverImageUrl,
  organizationName,
  episodes,
  locale,
  labels,
}: Props) {
  const [activeId, setActiveId] = useState<string | null>(
    episodes[0]?.id ?? null,
  );
  const [mode, setMode] = useState<ListenMode>("video");
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const active = useMemo(
    () => episodes.find((p) => p.id === activeId) ?? episodes[0] ?? null,
    [episodes, activeId],
  );
  const activeVariant = active ? pickVariant(active, locale) : null;
  const youtubeVideoId = youtubeIdForItem(active, locale);
  const fileVideoUrl = fileVideoUrlForItem(active, locale);
  const directAudioUrl = audioUrlForItem(active, locale);
  const hasVideo = Boolean(youtubeVideoId || fileVideoUrl);
  const hasAudio = Boolean(directAudioUrl);
  const fallbackDuration = activeVariant?.durationSeconds ?? 0;

  useEffect(() => {
    if (mode === "video" && !hasVideo && hasAudio) setMode("audio");
    if (mode === "audio" && !hasAudio && hasVideo) setMode("video");
  }, [mode, hasVideo, hasAudio]);

  useEffect(() => {
    setProgress(0);
    setPlaying(false);
    setAudioDuration(fallbackDuration);
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }, [activeId, mode, fallbackDuration]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el || mode !== "audio" || !directAudioUrl) return;

    const onTime = () => setProgress(el.currentTime);
    const onMeta = () => {
      if (Number.isFinite(el.duration) && el.duration > 0) {
        setAudioDuration(el.duration);
      }
    };
    const onEnded = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("durationchange", onMeta);
    el.addEventListener("ended", onEnded);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("durationchange", onMeta);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, [mode, directAudioUrl, activeId]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || mode !== "video" || !fileVideoUrl) return;

    if (playing) void el.play().catch(() => setPlaying(false));
    else el.pause();
  }, [playing, mode, fileVideoUrl, activeId]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = muted;
    el.volume = volume;
  }, [muted, volume]);

  function selectEpisode(id: string) {
    setActiveId(id);
    setProgress(0);
    setPlaying(true);
  }

  function togglePlay() {
    if (mode === "audio" && directAudioUrl && audioRef.current) {
      if (playing) audioRef.current.pause();
      else void audioRef.current.play();
      return;
    }
    if (mode === "video" && fileVideoUrl && videoRef.current) {
      if (playing) videoRef.current.pause();
      else void videoRef.current.play();
      setPlaying((p) => !p);
      return;
    }
    setPlaying((p) => !p);
  }

  function seekAudio(ratio: number) {
    const el = audioRef.current;
    const duration = audioDuration > 0 ? audioDuration : fallbackDuration || 1;
    const next = Math.max(0, Math.min(duration, ratio * duration));
    setProgress(next);
    if (el) el.currentTime = next;
  }

  function skipBy(seconds: number) {
    const el = audioRef.current;
    if (!el) return;
    const duration = audioDuration > 0 ? audioDuration : el.duration || 0;
    const next = Math.max(0, Math.min(duration, el.currentTime + seconds));
    el.currentTime = next;
    setProgress(next);
  }

  const displayDuration =
    audioDuration > 0 ? audioDuration : fallbackDuration || null;
  const progressPct = displayDuration
    ? Math.min(100, (progress / displayDuration) * 100)
    : 0;

  return (
    <div className="pb-16">
      <div className="border-b border-oak-rule bg-oak-paper/80">
        <div className="oak-container py-6 sm:py-8">
          <Link
            href="/browse/podcasts"
            className="text-xs font-bold uppercase tracking-wider text-oak-stone hover:text-oak-fire"
          >
            ← {labels.backToPodcasts}
          </Link>

          <div className="mt-5 flex flex-col gap-5 sm:mt-6 sm:flex-row sm:items-end sm:gap-8">
            <Cover
              src={coverImageUrl}
              title={seriesTitle}
              className="aspect-square w-40 shrink-0 sm:w-52"
            />
            <div className="min-w-0 flex-1 pb-1">
              <p className="kicker">Podcast</p>
              <h1 className="mt-2 font-display text-[clamp(1.75rem,5vw,3rem)] font-medium leading-tight text-oak-ink">
                {seriesTitle}
              </h1>
              <p className="mt-2 text-sm text-oak-stone">
                {organizationName ? `${organizationName} · ` : ""}
                {episodes.length}{" "}
                {episodes.length === 1 ? labels.episode : labels.episodes}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="oak-container py-8 sm:py-10">
        {active && activeVariant ? (
          <section className="mb-10 sm:mb-12" aria-label={labels.chooseFormat}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-wider text-oak-stone">
                {labels.chooseFormat}
              </p>
              <div
                className="inline-flex border border-oak-rule bg-oak-sand/50 p-0.5"
                role="tablist"
                aria-label={labels.chooseFormat}
              >
                {hasVideo ? (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === "video"}
                    onClick={() => setMode("video")}
                    className={`px-4 py-2 text-sm font-semibold transition-colors ${
                      mode === "video"
                        ? "bg-oak-ink text-oak-bone"
                        : "text-oak-ink hover:bg-oak-sand"
                    }`}
                  >
                    {labels.listenVideo}
                  </button>
                ) : null}
                {hasAudio ? (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === "audio"}
                    onClick={() => setMode("audio")}
                    className={`px-4 py-2 text-sm font-semibold transition-colors ${
                      mode === "audio"
                        ? "bg-oak-ink text-oak-bone"
                        : "text-oak-ink hover:bg-oak-sand"
                    }`}
                  >
                    {labels.listenAudio}
                  </button>
                ) : null}
              </div>
            </div>

            <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-oak-stone">
              {labels.nowPlaying}
            </p>
            <h2 className="mt-1 font-display text-xl font-medium text-oak-ink sm:text-2xl">
              {activeVariant.title}
            </h2>
            <p className="mt-1 text-sm text-oak-stone">
              {formatDate(active.publishedAt, locale)}
              {formatDuration(activeVariant.durationSeconds)
                ? ` · ${formatDuration(activeVariant.durationSeconds)}`
                : ""}
            </p>

            {mode === "video" && (youtubeVideoId || fileVideoUrl) ? (
              <div className="mx-auto mt-6 max-w-3xl">
                <div className="overflow-hidden border border-oak-rule bg-oak-ink shadow-[0_12px_40px_rgba(26,21,18,0.18)]">
                  <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 sm:px-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/55">
                      {labels.listenVideo}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-oak-fire" aria-hidden />
                  </div>
                  <div className="relative aspect-video w-full bg-black">
                    {fileVideoUrl ? (
                      <video
                        ref={videoRef}
                        key={`${fileVideoUrl}-video`}
                        src={fileVideoUrl}
                        controls
                        playsInline
                        className="absolute inset-0 h-full w-full"
                        onPlay={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
                        onEnded={() => setPlaying(false)}
                      />
                    ) : youtubeVideoId ? (
                      <iframe
                        key={`${youtubeVideoId}-video`}
                        title={activeVariant.title}
                        src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1&playsinline=1&enablejsapi=1${
                          playing ? "&autoplay=1" : ""
                        }`}
                        className="absolute inset-0 h-full w-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}

            {mode === "audio" && directAudioUrl ? (
              <div className="mx-auto mt-6 max-w-xl">
                <div className="rounded-2xl border border-oak-rule bg-white p-4 shadow-[0_10px_32px_rgba(26,21,18,0.1)] sm:p-5">
                  <div className="flex gap-4 sm:gap-5">
                    <Cover
                      src={active.coverImageUrl ?? coverImageUrl}
                      title={activeVariant.title}
                      className="h-24 w-24 shrink-0 rounded-lg sm:h-28 sm:w-28"
                    />
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                      <p className="line-clamp-2 text-sm font-bold leading-snug text-oak-ink sm:text-base">
                        {activeVariant.title}
                      </p>
                      <p className="mt-1 truncate text-xs text-oak-stone sm:text-sm">
                        {organizationName ?? seriesTitle}
                      </p>

                      <div className="mt-3">
                        <div className="mb-1 flex justify-between text-[11px] tabular-nums text-oak-stone">
                          <span>{formatDuration(progress) ?? "0:00"}</span>
                          <span>
                            {displayDuration
                              ? formatDuration(displayDuration)
                              : "--:--"}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="block h-1 w-full overflow-hidden rounded-full bg-oak-clay"
                          aria-label="Seek"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            seekAudio((e.clientX - rect.left) / rect.width);
                          }}
                        >
                          <span
                            className="block h-full rounded-full bg-oak-fire transition-[width] duration-150"
                            style={{ width: `${progressPct}%` }}
                          />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button
                            type="button"
                            aria-label="Back 15 seconds"
                            onClick={() => skipBy(-15)}
                            className="flex h-9 w-9 items-center justify-center text-oak-ink hover:text-oak-fire"
                          >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                              <path d="M12 5a7 7 0 1 0 7 7" strokeLinecap="round" />
                              <path d="M12 5V2L8.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
                              <text x="12" y="14.5" textAnchor="middle" fill="currentColor" stroke="none" fontSize="7" fontWeight="700" fontFamily="system-ui,sans-serif">15</text>
                            </svg>
                          </button>
                          <button
                            type="button"
                            aria-label={playing ? labels.pause : labels.play}
                            onClick={togglePlay}
                            className="flex h-10 w-10 items-center justify-center text-oak-ink hover:text-oak-fire"
                          >
                            {playing ? (
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                              </svg>
                            ) : (
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            )}
                          </button>
                          <button
                            type="button"
                            aria-label="Forward 15 seconds"
                            onClick={() => skipBy(15)}
                            className="flex h-9 w-9 items-center justify-center text-oak-ink hover:text-oak-fire"
                          >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                              <path d="M12 5a7 7 0 1 1-7 7" strokeLinecap="round" />
                              <path d="M12 5V2l3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                              <text x="12" y="14.5" textAnchor="middle" fill="currentColor" stroke="none" fontSize="7" fontWeight="700" fontFamily="system-ui,sans-serif">15</text>
                            </svg>
                          </button>
                        </div>

                        <div className="flex items-center gap-0.5 sm:gap-1">
                          <button
                            type="button"
                            aria-label={muted ? "Unmute" : "Mute"}
                            onClick={() => setMuted((m) => !m)}
                            className="flex h-9 w-9 items-center justify-center text-oak-stone hover:text-oak-ink"
                          >
                            {muted || volume === 0 ? (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M5 9v6h4l5 5V4L9 9H5zm12.5 3L21 15.5 19.5 17 16 13.5 12.5 17 11 15.5 14.5 12 11 8.5 12.5 7 16 10.5 19.5 7 21 8.5 17.5 12z" />
                              </svg>
                            ) : (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M5 9v6h4l5 5V4L9 9H5zm11.5 3c0-1.8-1-3.3-2.5-4.1v8.1c1.5-.7 2.5-2.2 2.5-4zM14 3.2v2.1c2.9.9 5 3.5 5 6.7s-2.1 5.8-5 6.7v2.1c4-.9 7-4.5 7-8.8s-3-7.9-7-8.8z" />
                              </svg>
                            )}
                          </button>
                          <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.05}
                            value={muted ? 0 : volume}
                            aria-label="Volume"
                            onChange={(e) => {
                              const v = Number(e.target.value);
                              setVolume(v);
                              if (v > 0) setMuted(false);
                            }}
                            className="hidden w-16 accent-oak-fire sm:block"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <audio
                    ref={audioRef}
                    src={directAudioUrl}
                    preload="metadata"
                    className="hidden"
                    autoPlay={playing}
                  />
                </div>
              </div>
            ) : null}
          </section>
        ) : null}

        <h2 className="font-display text-xl font-medium text-oak-ink sm:text-2xl">
          {labels.episodes}
        </h2>

        {episodes.length === 0 ? (
          <p className="mt-6 text-sm text-oak-stone">{labels.empty}</p>
        ) : (
          <ol className="mt-5 divide-y divide-oak-rule border-y border-oak-rule">
            {episodes.map((item, index) => {
              const v = pickVariant(item, locale);
              const on = item.id === active?.id;
              const dur = formatDuration(v?.durationSeconds);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => selectEpisode(item.id)}
                    className={`flex w-full items-start gap-3 py-4 text-start transition-colors sm:gap-4 sm:py-5 ${
                      on ? "bg-oak-sand/60" : "hover:bg-oak-sand/40"
                    }`}
                  >
                    <span className="w-7 shrink-0 pt-1 text-sm font-bold tabular-nums text-oak-stone">
                      {index + 1}
                    </span>
                    <Cover
                      src={item.coverImageUrl}
                      title={v?.title ?? item.title}
                      className="h-14 w-14 shrink-0 sm:h-16 sm:w-16"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-oak-ink sm:text-lg">
                        {v?.title ?? item.subtitle ?? item.title}
                      </span>
                      <span className="mt-1 block text-xs text-oak-stone sm:text-sm">
                        {formatDate(item.publishedAt, locale)}
                        {dur ? ` · ${dur}` : ""}
                      </span>
                    </span>
                    <span
                      className={`mt-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        on && playing
                          ? "bg-oak-ink text-oak-bone"
                          : "bg-oak-fire text-white"
                      }`}
                      aria-hidden
                    >
                      {on && playing ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}
