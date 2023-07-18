import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  loginUser,
  setLoading,
  setUser,
} from "../redux/features/user/userSlice";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import Loading from "../components/Loading";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return;

    const loginData = {
      email,
      password,
    };
    await dispatch(loginUser(loginData));
  };

  useEffect(() => {
    if (user?.email && !isLoading) navigate("/");
  }, [user, navigate, isLoading]);

  useEffect(() => {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email));
      }
      dispatch(setLoading(false));
    });
  }, [dispatch]);

  if (isLoading) return <Loading />;

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <img src="./login.jpg" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              {error && (
                <label className="label label-text-alt text-red-600">
                  {error}
                </label>
              )}
            </div>

            <div className="form-control mt-6">
              <button
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handleLogin}
                className="btn btn-primary"
                disabled={isLoading}
              >
                Login
              </button>
            </div>
            <div>
              <span>
                Don't have an account
                <Link to="/signup">
                  <button className="btn btn-link text-lime-700">
                    Sign up
                  </button>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
