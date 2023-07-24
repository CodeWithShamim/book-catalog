import { toast } from "react-hot-toast";
import TextInput from "../components/ui/TextInput";
import { IBook } from "../types";
import { genreData } from "../utils";
import { useState, ChangeEvent, FormEvent } from "react";

export default function AddBook() {
  const [bookData, setBookData] = useState<IBook>({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    image: "",
  });

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleAddBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, author, genre, publicationDate, image } = bookData;

    if (!title || !author || !genre || !publicationDate || !image) {
      toast.error("Book data is missing");
      return;
    }
  };

  return (
    <form
      onSubmit={handleAddBook}
      className="flex flex-col items-center gap-3 py-16 bg-slate-500 rounded px-4"
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

      <button className="btn btn-primary w-80 md:w-[572px] mt-8 md:ml-28">
        Added
      </button>
    </form>
  );
}
