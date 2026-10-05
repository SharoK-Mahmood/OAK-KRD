export default function Loading() {
  return (
    <div className="oak-container animate-pulse py-8 sm:py-10">
      <div className="h-3 w-20 bg-oak-sand" />
      <div className="mt-3 h-9 w-2/3 max-w-md bg-oak-sand" />
      <div className="mt-8 space-y-4">
        <div className="h-16 bg-oak-sand/80" />
        <div className="h-16 bg-oak-sand/80" />
        <div className="h-16 bg-oak-sand/80" />
      </div>
    </div>
  );
}
