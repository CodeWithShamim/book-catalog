/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import BookCard from "../components/BookCard";
import SkeletonCard from "../components/skeleton/SkeletonCard";
import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types";

export default function AllBooks() {
  const { isLoading, data, isError, error } = useGetBooksQuery(undefined);

  console.log(isError);
  console.log(error);

  return (
    <div className="col-span-9 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-20">
      {/* add loading skeletion */}
      {isLoading && [...Array(10)].map(() => <SkeletonCard />)}

      {data.data.map((book: IBook) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}
