import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { UserAuth } from "../components/AuthContext";
import login_bg from "../assets/login_bg.webp";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = UserAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password, username);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-full w-full ">
        <img
          src={login_bg}
          alt="/"
          className="absolute   h-[40%] w-full object-cover "
        />
        <div className="fixed left-0 top-0 h-screen w-full bg-black/65"></div>
        <div className="fixed z-10 w-full px-4 pt-[5%] ">
          <div className="h-[460px]  mx-auto  max-w-[450px] rounded-xl bg-black/40 text-white backdrop-blur-md">
            <div className="mx-auto max-w-[320px]  py-16 ">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col py-4"
              >
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  className="my-2 rounded bg-gray-700 p-3"
                  type="text"
                  placeholder="User Name"
                  autoComplete="email"
                />
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
                  minlength="6" required 

                  autoComplete="current-password"
                />
                <button className="my-6 rounded bg-[#e50914] py-3 font-bold">
                  Sign Up
                </button>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <p>
                    <input type="checkbox" className="mr-2 " />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-8">
                  <span className="text-gray-600">
                    Already Sign Up to Youtube?
                  </span>{" "}
                        <Link to="/login"> Log In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
