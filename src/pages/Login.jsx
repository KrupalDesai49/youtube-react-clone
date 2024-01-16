import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../components/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message)
    }
  };

  return (
    <>
      <div className="h-full w-full">
        <img
          src="https://media.wired.com/photos/631277a6ba2a66af641b132a/master/w_1920,c_limit/YouTube-Premium-Perks-Gear-Alamy-2F8A813.jpg"
          alt="/"
          className="absolute hidden h-full w-full object-cover sm:block"
        />
        <div className="fixed left-0 top-0 h-full w-full bg-black/65"></div>
        <div className="fixed z-10 w-full px-4 pt-[5%]">
          <div className="h-[460px]  mx-auto  max-w-[450px] rounded-xl bg-black/40 text-white backdrop-blur-md">
            <div className="mx-auto max-w-[320px]  py-16 ">
              <h1 className="text-3xl font-bold">Log In</h1>

              {error?<p className="p-3 bg-red-400 rounded my-2">{error}</p>:null}
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col py-4"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="my-2 rounded bg-gray-700 p-3"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="my-2 rounded bg-gray-700 p-3"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <button className="my-6 rounded bg-[#e50914] py-3 font-bold">
                  Log In
                </button>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <p>
                    <input type="checkbox" className="mr-2 " />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-8">
                  <span className="text-gray-600">New to Netflix?</span>{" "}
                  <Link to="/signup"> Let's Create Account</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
