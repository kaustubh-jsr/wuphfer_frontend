import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <>
      <p className="font-thin flex text-yellow-800 bg-yellow-100 w-2/5 px-2 py-3 my-2">
        Forgot your password? Enter your registered e-mail address below, and
        we'll send you an e-mail containing the OTP to reset your password.
      </p>
      <p className="text-sm text-gray-400 mb-5 font-semibold">
        New to Wuphfer ?{" "}
        <Link
          to="/auth/signup"
          className="text-sky-500 font-semibold text-base"
        >
          Create an account
        </Link>
      </p>
      <div className="w-2/5">
        <form className="flex flex-col gap-2.5" onSubmit={() => {}}>
          <input
            type="email"
            className="border-2 rounded-md py-2 px-1"
            placeholder="Your Email"
            name="email"
            required
            //   onChange={() => setEmailError("")}
          />
          {/* {emailError && <p style={{ color: "red" }}>{emailError}</p>} */}

          <button
            type="submit"
            className="w-full rounded-md bg-sky-400 hover:bg-sky-500 transition duration-200 ease-out text-white py-2"
            //   disabled={auth.loading}
          >
            Get OTP
            {/* {auth.loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            "Sign Up"
          )} */}
          </button>
        </form>
      </div>
    </>
  );
};

export { ForgotPassword };
