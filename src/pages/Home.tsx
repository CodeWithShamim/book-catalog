/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect } from "react";
import BookCard from "../components/BookCard";
import SkeletonCard from "../components/skeleton/SkeletonCard";
import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types";
import { toast } from "react-hot-toast";

export default function Home() {
  const { isLoading, data, error } = useGetBooksQuery(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      error && toast.error("Something went wrong");
    }, 500);

    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className="py-16">
      <h1 className="text-xl font-semibold py-5">Top 10 recent books</h1>
      <div className="col-span-9 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* add loading skeletion */}
        {isLoading && [...Array(10)].map(() => <SkeletonCard />)}

        {data?.data?.slice(0, 10)?.map((book: IBook) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
