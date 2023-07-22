import Skeleton from "react-loading-skeleton";

export default function SkeletonDetails() {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl flex">
      <div className="sm:w-full md:w-72">
        <Skeleton height={400} />
      </div>
      <div className="card-body">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <div className="flex justify-around mt-auto">
          <Skeleton width={100} height={25} />
          <Skeleton width={100} height={25} />
        </div>
      </div>
    </div>
  );
}
