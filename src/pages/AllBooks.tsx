import BookCard from "../components/BookCard";
import { IBook } from "../types";

const booksArray = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    publicationDate: "July 11, 1960",
    image: "https://i.postimg.cc/7PnW8K5Y/img1.jpg",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    publicationDate: "July 11, 1960",
    image: "https://i.postimg.cc/7PnW8K5Y/img1.jpg",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    publicationDate: "July 11, 1960",
    image: "https://i.postimg.cc/7PnW8K5Y/img1.jpg",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Science Fiction",
    publicationDate: "June 8, 1949",
    image: "https://i.postimg.cc/jdqksyf6/img2.jpg",
  },
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    genre: "Mystery",
    publicationDate: "June 5, 2012",
    image: "https://i.postimg.cc/g2nShdNn/img3.jpg",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    publicationDate: "January 28, 1813",
    image: "https://i.postimg.cc/ZqNwfHkm/img4.jpg",
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    genre: "Non-fiction",
    publicationDate: "February 10, 2011",
    image: "https://i.postimg.cc/YqXDjjN5/img5.jpg",
  },
  // ... and so on for the other 15 books
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    publicationDate: "April 10, 1925",
    image: "https://i.postimg.cc/jSm8Q9Fv/img6.jpg",
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    publicationDate: "June 26, 1997",
    image: "https://i.postimg.cc/d1K4gCvy/img7.jpg",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publicationDate: "September 21, 1937",
    image: "https://i.postimg.cc/26F2Y58X/img8.jpg",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Classic",
    publicationDate: "July 16, 1951",
    image: "https://i.postimg.cc/7PnW8K5Y/img1.jpg",
  },
  {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    genre: "Science Fiction",
    publicationDate: "September 14, 2008",
    image: "https://i.postimg.cc/jSm8Q9Fv/img6.jpg",
  },
];

export default function AllBooks() {
  return (
    <div className="col-span-9 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-20">
      {booksArray?.map((book: IBook) => (
        <BookCard book={book} />
      ))}
    </div>
  );
}
