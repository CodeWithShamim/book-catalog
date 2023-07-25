/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { addLocalWishlist } from "../redux/features/wishlist/wishlistSlice";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { books } = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();
  const [toggleReading, setToggleReading] = useState<boolean>(false);

  useEffect(() => {
    const localWishlist = localStorage.getItem("wishlist");
    const parsedWishlist = JSON.parse(localWishlist as string);

    if (parsedWishlist) {
      dispatch(addLocalWishlist(parsedWishlist));
    }
  }, [dispatch]);

  return (
    <div className="bg-success py-16 my-16 px-6 rounded">
      {books?.length < 1 && (
        <h1 className="text-xl font-semibold text-center text-red-500">
          Empty wishlist!😜
        </h1>
      )}

      {books?.map((book) => (
        <div className="collapse collapse-arrow bg-base-200 my-2">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            ✔{book.title}
          </div>
          <div className="collapse-content flex items-center justify-around gap-16">
            <div>
              <p className="text-sm">Author: {book.author}</p>
              <p className="text-sm">Genre: {book.genre}</p>
              <p className="text-sm pb-2">
                Publication date: {book.publicationDate}
              </p>
              <Link to={`/book-details/${book._id}`}>
                <img className="object" src={book.image} alt={book.title} />
              </Link>
            </div>

            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text mr-2">Finished reading</span>
                <input
                  type="checkbox"
                  onChange={() => setToggleReading(!toggleReading)}
                  checked={toggleReading}
                  className="checkbox checkbox-success"
                />
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
