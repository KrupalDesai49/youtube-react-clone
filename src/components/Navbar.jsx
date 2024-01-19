import React from "react";
import logo from "../assets/youtube_name_logo.svg";
import search from "../assets/search.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";
import person from "../assets/person.svg";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  console.log(user)

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="z-[100] flex items-center justify-between py-4 font-roboto">
      {/* Logo */}
      <Link to="/" className="">
        <img src={logo} alt="" className="mx-6 w-24" />
      </Link>
      {/* Search Bar */}
      <div className="mx-3 flex shrink rounded-full  bg-[#222222] text-white ring-1 ring-[#383838] sm:w-[50%] ">
        <input
          type="text"
          placeholder="Search"
          className="  laceholder:text-neutral-400 w-full rounded-l-full bg-[#000000] py-[0.4rem]   pl-5"
        />
        <img
          src={search}
          alt=""
          className="pointer-events-none mx-2 w-7 sm:mx-4 sm:w-8"
        />
      </div>

      {/* Log In & Sign in */}
      {user?.email ? (
        <div className="flex shrink-0 items-center pr-3">
          <button className="mr-3 h-10 w-10 rounded-full bg-[#ff0000] text-xl font-[500] text-white hover:bg-[#ff0000]/90">
            {user.displayName.charAt(0).toUpperCase()}
          </button>
          <button
            onClick={handleLogout}
            className="flex cursor-pointer items-center justify-center rounded-full border border-[#37a6ff] bg-[#0d141c] px-3 py-2 text-[#37a6ff]"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex shrink-0 items-center pr-3">
          {/* <Link to="/login">
          <button className="pr-4 text-white">Sign In</button>{" "}
        </Link> */}
          <Link to="/signup">
            <button className=" flex cursor-pointer items-center justify-center rounded-full border border-[#37a6ff] bg-[#0d141c] px-3 py-2 text-[#37a6ff] hover:bg-[#263850]">
              <img src={person} alt="" className="w-5 " />
              <p className="pl-1.5 text-sm">Sign Up</p>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
