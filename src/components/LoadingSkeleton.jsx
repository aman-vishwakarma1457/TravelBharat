export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="card overflow-hidden"
          aria-hidden="true"
        >
          {/* Image Skeleton */}
          <div className="shimmer aspect-[16/10]" />

          {/* Content Skeleton */}
          <div className="space-y-3 p-4">
            <div className="shimmer h-4 w-2/3 rounded" />

            <div className="shimmer h-3 w-full rounded" />

            <div className="shimmer h-3 w-4/5 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}