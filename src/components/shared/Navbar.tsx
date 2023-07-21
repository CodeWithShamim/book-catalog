/* eslint-disable @typescript-eslint/no-misused-promises */
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { setUser } from "../../redux/features/user/userSlice";

export default function Navbar() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(setUser(null));
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost font-bold text-xl">
          BOOK-C
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search books"
            className="input input-bordered w-24 md:w-auto"
          />
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
              <button className="btn btn-ghost" onClick={handleLogout}>
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
                <button className="btn btn-ghost" onClick={handleLogout}>
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
