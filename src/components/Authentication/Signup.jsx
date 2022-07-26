import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiClient, BASE_URL } from "../../api";
import { signup as signupApi } from "../../api/auth";
const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [mismatchError, setMismatchError] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [usernameAvailableMsg, setUsernameAvailableMsg] = useState();
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const checkUsernameAvailable = async () => {
      if (username.trim().length !== 0) {
        //  give an api call to check if username is available
        const resp = await apiClient({
          method: "GET",
          url: `${BASE_URL}/check_username_available`,
          params: {
            requested_username: username,
          },
        });
        if (resp.status === 200) {
          if (resp.data.status === "false") {
            setUsernameAvailable(false);
          } else {
            setUsernameAvailable(true);
          }
          setUsernameAvailableMsg(resp.data.message);
        }
      } else {
        setUsernameAvailableMsg("");
      }
    };
    // this request goes after the delay specified unless there is input
    // change before the timer runs out
    // and the cleanup function removes this timer and adds new one.
    let id = setTimeout(() => checkUsernameAvailable(), 500);
    return () => {
      clearTimeout(id);
    };
  }, [username]);

  const signupFormHandler = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData.append("username", username);
    if (password === rePassword) {
      // proceed to api call,setErrors from server side if any, else login and replaace history
      signupApi(
        formData,
        () => {
          navigate("/auth", { replace: true, state: { from: location } });
        },
        setLoading
      );
    } else {
      setMismatchError("Passwords do not match.");
    }
  };

  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  //   console.log(values.first_name);
  // };

  // const handleClickShowPassword = () => {
  //   setValues({
  //     ...values,
  //     showPassword: !values.showPassword,
  //   });
  // };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  return (
    <>
      <p className="text-sm text-gray-400 mb-5 font-semibold">
        Already have an account ?{" "}
        <Link to="/auth" className="text-sky-500 font-semibold text-base">
          Sign in
        </Link>
      </p>
      <div className="w-3/4 lg:w-2/5">
        <form className="flex flex-col gap-2.5" onSubmit={signupFormHandler}>
          <input
            type="text"
            className="border-2 rounded-md py-2 px-1"
            placeholder="Name"
            name="first_name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {/* {firstNameError && <p style={{ color: "red" }}>{firstNameError}</p>} */}
          <input
            type="text"
            className="border-2 rounded-md py-2 px-1"
            placeholder="Last Name"
            name="last_name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            className="border-2 rounded-md py-2 px-1"
            placeholder="Your Email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <p className="absolute text-slate-400 flex items-center pl-2 h-full">
              @
            </p>
            <input
              id="username"
              className="pl-8 border-2 rounded-md py-2 px-1 w-full"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <input
            type="password"
            className="border-2 rounded-md py-2 px-1"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={(e) => {
              setMismatchError("");
              setPassword(e.target.value);
            }}
          />

          <input
            type="password"
            className={`border-2 rounded-md py-2 px-1 ${
              mismatchError && "border-red-500"
            }`}
            placeholder="Confirm Password"
            name="rePassword"
            required
            value={rePassword}
            onChange={(e) => {
              setMismatchError("");
              setRePassword(e.target.value);
            }}
          />
          <button
            type="submit"
            className="disabled:bg-sky-300 disabled:cursor-not-allowed w-full rounded-md bg-sky-400 hover:bg-sky-500 transition duration-200 ease-out text-white py-2"
            disabled={loading || !usernameAvailable}
          >
            {loading ? (
              <CircularProgress sx={{ color: "white" }} size={20} />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        {mismatchError && <p className="text-red-500 py-4">{mismatchError}</p>}
        {usernameAvailableMsg && (
          <p
            className={`${
              usernameAvailable ? "text-green-600" : "text-red-500"
            }`}
          >
            {usernameAvailableMsg}
          </p>
        )}
      </div>
    </>
  );
};

export { Signup };
