import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";

export default function Navbar() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost font-bold text-xl">BOOK-C</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search Books"
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
              <button className="btn btn-ghost">
                <Link to="/all-books">Logout</Link>
              </button>
            ) : (
              <button className="btn btn-ghost">
                <Link to="/login">Login</Link>
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
