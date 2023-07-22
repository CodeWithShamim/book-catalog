import Skeleton from "react-loading-skeleton";

export default function SkeletonCard() {
  return (
    <div className="card card-compact bg-base-100 shadow-lg hover:scale-[101%] transition-all gap-2">
      <Skeleton className="w-full h-[350px]" />
      <div className="card-body">
        <Skeleton height={20} />
        <Skeleton width={200} />
        <Skeleton width={180} />
        <Skeleton width={250} />

        <div className="flex justify-around">
          <Skeleton width={100} height={25} />
          <Skeleton width={100} height={25} />
        </div>
      </div>
    </div>
  );
}
