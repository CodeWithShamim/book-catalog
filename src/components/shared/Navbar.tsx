/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { setUser } from "../../redux/features/user/userSlice";
import { useEffect, useState } from "react";
import { useGetBooksQuery } from "../../redux/features/books/bookApi";
import { addBook, setLoading } from "../../redux/features/books/bookSlice";
import { genreData } from "../../utils";

export default function Navbar() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>("");
  const [filtersValue, setFiltersValue] = useState<string>("");

  const endPointURL = `${filtersValue && `genre=${filtersValue}`}${
    searchValue && `&searchTerm=${searchValue}`
  }`;
  const { data, isLoading } = useGetBooksQuery(endPointURL ?? undefined);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(setUser(null));
  };

  useEffect(() => {
    dispatch(setLoading(isLoading));

    if (data?.success) {
      dispatch(addBook(data.data));
    }
  }, [data, dispatch, isLoading]);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost font-bold text-xl">
          BOOK-C
        </Link>
      </div>

      <div className="flex-none gap-2">
        {/* search & filter option for laptop & desktop */}
        <div className="form-control">
          <div className="join">
            <div>
              <div>
                <input
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                  className="input input-bordered md:join-item w-28 md:w-52"
                  placeholder="Search books..."
                />
              </div>
            </div>
            <select
              onChange={(e) => setFiltersValue(e.target.value)}
              className="select select-bordered join-item hidden md:block"
            >
              <option disabled selected>
                Filter
              </option>
              <option value="">All</option>

              {genreData?.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="hidden md:block">
          <button className="btn btn-ghost">
            <Link to="/all-books">All Books</Link>
          </button>

          {user?.email ? (
            <>
              <button className="btn btn-ghost">
                <Link to="/add-book">Add Book</Link>
              </button>
              <button className="btn btn-ghost">
                <Link to="/wishlist">Wishlist</Link>
              </button>
              <button className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-ghost">
                <Link to="/login">Sign in</Link>
              </button>
              <button className="btn btn-ghost">
                <Link to="/signup">Sign up</Link>
              </button>
            </>
          )}
        </div>

        {/* dropdown item for mobile  */}
        <div className="dropdown dropdown-bottom dropdown-end sm:visible md:hidden">
          <label tabIndex={0} className="btn btn-ghost m-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-44 text-left"
          >
            {/* filter option for mobile */}
            <select
              onChange={(e) => setFiltersValue(e.target.value)}
              className="select select-bordered join-item"
            >
              <option disabled selected>
                Filter
              </option>

              <option value="">All</option>

              {genreData?.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            <button className="btn btn-ghost">
              <Link to="/all-books">All Books</Link>
            </button>

            {user?.email ? (
              <>
                <button className="btn btn-ghost">
                  <Link to="/add-book">Add Book</Link>
                </button>
                <button className="btn btn-ghost">
                  <Link to="/wishlist">Wishlist</Link>
                </button>
                <button className="btn btn-sm md:btn-md" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-ghost">
                  <Link to="/login">Sign in</Link>
                </button>
                <button className="btn btn-ghost">
                  <Link to="/signup">Sign up</Link>
                </button>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
