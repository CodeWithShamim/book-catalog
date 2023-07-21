/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import BookCard from "../components/BookCard";
import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types";

export default function Home() {
  const { isLoading, data, isError, error } = useGetBooksQuery(undefined);

  console.log(isLoading, "IsLoading");
  console.log(data);
  console.log(isError);
  console.log(error);

  return (
    <div className="py-16">
      <h1 className="text-xl font-semibold py-5">Top 10 recent books</h1>
      <div className="col-span-9 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.data?.map((book: IBook) => (
          <BookCard book={book} />
        ))}
      </div>
    </div>
  );
}
