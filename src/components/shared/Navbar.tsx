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

        <ul tabIndex={0} className=" p-3 flex gap-5">
          <li>
            <button className="btn btn-ghost">
              <Link to="/all-books">All Books</Link>
            </button>
          </li>
          <li>
            {user?.email ? (
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              <button className="btn btn-ghost" onClick={handleLogout}>
                Logout
              </button>
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
          </li>
        </ul>
      </div>
    </div>
  );
}
