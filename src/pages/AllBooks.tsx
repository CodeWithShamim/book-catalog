/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import BookCard from "../components/BookCard";
import SkeletonCard from "../components/skeleton/SkeletonCard";
import { IBook } from "../types";
import { useAppSelector } from "../redux/hook";

export default function AllBooks() {
  const { book, isLoading } = useAppSelector((state) => state.book);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     error && toast.error("Something went wrong");
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, [error]);

  return (
    <div className="col-span-9 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-20">
      {/* add loading skeletion */}
      {isLoading && [...Array(10)].map(() => <SkeletonCard />)}

      {book?.map((book: IBook) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}
