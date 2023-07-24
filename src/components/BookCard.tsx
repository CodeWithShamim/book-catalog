/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Link } from "react-router-dom";
import { IBook } from "../types";
import { useAppDispatch } from "../redux/hook";
import { addWishlist } from "../redux/features/wishlist/wishlistSlice";
import { toast } from "react-hot-toast";

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  const { _id: id, title, author, genre, publicationDate, image } = book;
  const dispatch = useAppDispatch();

  const hanldeAddWishlist = () => {
    dispatch(addWishlist(book));
    toast.success(`${title} added to wishlist`);
  };

  return (
    <div className="card card-compact bg-base-100 shadow-xl hover:shadow-2xl hover:scale-[103%] transition-all gap-2">
      <Link to={`/book-details/${id}`}>
        <figure>
          <img className="w-full" src={image} alt={title} />
        </figure>
      </Link>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm">Author: {author}</p>
        <p className="text-sm">Genre: {genre}</p>
        <p className="text-sm pb-2">Publication date: {publicationDate}</p>
        <div className="flex justify-around">
          <button
            onClick={hanldeAddWishlist}
            className="btn btn-sm btn-primary"
          >
            Add wishlist
          </button>

          <Link to={`/book-details/${id}`}>
            <button className="btn btn-sm btn-success">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
