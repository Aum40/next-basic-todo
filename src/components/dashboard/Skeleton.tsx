export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-8 flex flex-col animate-pulse gap-2">
      <div className="w-20 h-6 bg-gray-300"></div>
      <div className="w-10 h-6 bg-gray-300 self-center"></div>
    </div>
  );
}

export function CardSkeletonGroup() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}
