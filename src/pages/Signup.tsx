import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useEffect, useState } from "react";
import { createUser } from "../redux/features/user/userSlice";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) return;

    const data = {
      email,
      password,
    };
    await dispatch(createUser(data));
  };

  useEffect(() => {
    if (user?.email && !isLoading) navigate("/");
  }, [user, navigate, isLoading]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <img src="./register.jpg" className="" />
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

              {error && (
                <label className="label label-text-alt text-red-600">
                  {error}
                </label>
              )}
            </div>

            <div className="form-control mt-6">
              <button
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handleRegister}
                className="btn btn-secondary"
                disabled={isLoading}
              >
                Sign up
              </button>
            </div>
            <div>
              <span>
                Already have an account?
                <Link to="/login">
                  <button className="btn btn-link text-lime-700">Login</button>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
