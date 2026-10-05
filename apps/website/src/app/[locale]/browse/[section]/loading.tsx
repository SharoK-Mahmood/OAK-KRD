export default function Loading() {
  return (
    <div className="oak-container animate-pulse py-8 sm:py-10">
      <div className="h-3 w-16 bg-oak-sand" />
      <div className="mt-3 h-10 w-48 bg-oak-sand" />
      <div className="mt-8 space-y-4 border-y border-oak-rule py-4">
        <div className="h-20 bg-oak-sand/80" />
        <div className="h-20 bg-oak-sand/80" />
        <div className="h-20 bg-oak-sand/80" />
      </div>
    </div>
  );
}
