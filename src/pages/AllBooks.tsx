/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import BookCard from "../components/BookCard";
import SkeletonCard from "../components/skeleton/SkeletonCard";
import { IBook } from "../types";
import { useAppSelector } from "../redux/hook";
import { Link } from "react-router-dom";

export default function AllBooks() {
  const { book, isLoading } = useAppSelector((state) => state.book);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     error && toast.error("Something went wrong");
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, [error]);

  return (
    <>
      <div className="col-span-9 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-20">
        {/* add loading skeletion */}
        {isLoading && [...Array(10)].map(() => <SkeletonCard />)}

        {book?.length < 1 && (
          <h1 className="text-xl font-semibold text-red-500 text-center w-[340px] md:w-[1000px]">
            Book not found! Change search or filters value
          </h1>
        )}

        {book?.map((book: IBook) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
      <Link to="/add-book">
        <button className="btn btn-success mb-16 w-full">Add New Book</button>
      </Link>
    </>
  );
}
