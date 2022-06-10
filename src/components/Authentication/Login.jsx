import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../redux/asyncActions/authActions";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname;

  useEffect(() => {
    if (isAuthenticated && from) {
      navigate(from, { replace: true });
    } else if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const loginFormHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData(e.target);
    formData.append("password", password);
    dispatch(
      login(formData, () => {
        navigate("/", { replace: true });
      })
    );
    setLoading(false);
  };
  return (
    <>
      <p className="text-sm text-gray-400 mb-5 font-semibold">
        New to Wuphfer ?{" "}
        <Link to="signup" className="text-sky-500 font-semibold text-base">
          Create an account
        </Link>
      </p>
      <div className="w-2/5">
        <form className="flex flex-col gap-2.5" onSubmit={loginFormHandler}>
          <input
            type="email"
            className="border-2 rounded-md py-2 px-1"
            placeholder="Your Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative w-full">
            <div
              onClick={() => setPasswordVisibility((prev) => !prev)}
              className="absolute right-0 text-gray-600 dark:text-gray-400 hover:text-gray-700 flex items-center pr-3 h-full cursor-pointer"
            >
              {password.trim().length
                ? !passwordVisibility
                  ? "Show"
                  : "Hide"
                : ""}
            </div>
            <input
              id="password"
              type={!passwordVisibility ? "password" : "text"}
              className="border-2 rounded-md py-2 px-1 w-full"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Link
            to="forgot_password"
            className="text-sky-600 text-sm font-medium mb-3"
          >
            Forgot Password ?
          </Link>
          <button
            type="submit"
            className="disabled:bg-sky-300 disabled:cursor-not-allowed w-full rounded-md bg-sky-400 hover:bg-sky-500 transition duration-200 ease-out text-white py-2"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress sx={{ color: "white" }} size={18} />
            ) : (
              "Login"
            )}
          </button>
          <button className="w-full rounded-md bg-white text-sky-500 border-2 transition duration-200 ease-out border-sky-500 hover:bg-sky-400 hover:text-white py-1">
            Use Test Credentials
          </button>
        </form>
      </div>
    </>
  );
};

export { Login };
