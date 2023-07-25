/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { toast } from "react-hot-toast";
import TextInput from "../components/ui/TextInput";
import { IBook } from "../types";
import { genreData } from "../utils";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useCreateBookMutation } from "../redux/features/books/bookApi";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

export default function AddBook() {
  const { user } = useAppSelector((state) => state.user);
  const [bookData, setBookData] = useState<IBook>({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    image: "",
    ref: user?.email,
  });
  const navigate = useNavigate();
  const [addBook, { isLoading, data }] = useCreateBookMutation();

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

  // add book
  const handleAddBook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, author, genre, publicationDate, image } = bookData;

    if (!title || !author || !genre || !publicationDate || !image) {
      toast.error("Book data is missing");
      return;
    }

    await addBook(bookData);
  };

  useEffect(() => {
    if (data?.success) {
      toast.success("Book added successfully!");
    }

    const timer = setTimeout(() => {
      data?.success && navigate("/all-books");
    }, 1300);

    return () => clearTimeout(timer);
  }, [data, navigate]);

  return (
    <form
      onSubmit={handleAddBook}
      className="flex flex-col items-center gap-3 py-16 my-16 bg-slate-500 rounded px-4"
    >
      <TextInput
        id="title"
        sideType="Title"
        placeholder="Book title"
        onChange={handleOnChange}
      />
      <TextInput
        id="author"
        sideType="Author"
        placeholder="Book author"
        onChange={handleOnChange}
      />
      <TextInput
        id="publicationDate"
        sideType="pub.. date"
        placeholder="Book publication date"
        onChange={handleOnChange}
      />
      <TextInput
        id="image"
        sideType="Image"
        placeholder="Book image"
        onChange={handleOnChange}
      />

      <div className="w-full text-center md:ml-28">
        <select
          id="genre"
          onChange={handleOnChange}
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
        {isLoading ? "Book Adding..." : "Add"}
      </button>
    </form>
  );
}
