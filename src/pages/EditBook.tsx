/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { toast } from "react-hot-toast";
import TextInput from "../components/ui/TextInput";
import { IBook } from "../types";
import { genreData } from "../utils";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useUpdateBookMutation } from "../redux/features/books/bookApi";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function EditBook() {
  const location = useLocation();
  const book = location.state?.data?.book;
  const [bookData, setBookData] = useState<IBook>(
    book
      ? book
      : {
          title: "",
          author: "",
          genre: "",
          publicationDate: "",
          image: "",
        }
  );
  const navigate = useNavigate();

  const [updateBook, { isLoading, data, error }] = useUpdateBookMutation();

  // handle input
  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // update book
  const handleUpdateBook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, author, genre, publicationDate, image } = bookData;

    if (!title || !author || !genre || !publicationDate || !image) {
      toast.error("Book data is missing");
      return;
    }

    await updateBook({ id: bookData?._id as string, data: bookData });
  };

  useEffect(() => {
    if (data?.success) {
      toast.success("Book updated successfully!");
    }

    const timer = setTimeout(() => {
      data?.success && navigate("/all-books");
    }, 1300);

    return () => clearTimeout(timer);
  }, [data, navigate]);

  useEffect(() => {
    if (!bookData?._id) {
      navigate("/all-books");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    const newError: any = error;
    if (newError) {
      toast.error(newError?.data?.message);
      console.log(newError);
    }
  }, [error, bookData?._id, navigate]);

  return (
    <form
      onSubmit={handleUpdateBook}
      className="flex flex-col items-center gap-3 py-16 my-16 bg-slate-500 rounded px-4"
    >
      <TextInput
        id="title"
        sideType="Title"
        placeholder="Book title"
        value={bookData?.title}
        onChange={handleOnChange}
      />
      <TextInput
        id="author"
        sideType="Author"
        placeholder="Book author"
        value={bookData?.author}
        onChange={handleOnChange}
      />
      <TextInput
        id="publicationDate"
        sideType="pub.. date"
        placeholder="Book publication date"
        value={bookData?.publicationDate}
        onChange={handleOnChange}
      />
      <TextInput
        id="image"
        sideType="Image"
        placeholder="Book image"
        value={bookData?.image}
        onChange={handleOnChange}
      />

      <div className="w-full text-center md:ml-28">
        <select
          id="genre"
          onChange={handleOnChange}
          value={bookData?.genre}
          className="select select-info w-full max-w-xl"
        >
          <option disabled selected>
            Select genre
          </option>
          {genreData?.map((genre, index) => (
            <option key={index}>{genre}</option>
          ))}
        </select>
      </div>

      <button
        disabled={isLoading}
        className="btn btn-primary w-52 md:w-[572px] mt-8 md:ml-28"
      >
        {isLoading ? "Book Editing..." : "Edit"}
      </button>
    </form>
  );
}
