import React from "react";
import logo from "../assets/youtube_name_logo.svg";
import search from "../assets/search.svg";

const Navbar = () => {
  return (
    <div className="flex justify-between bg-black py-4 font-roboto">
      {/* Logo */}
      <img src={logo} alt="" className="mx-6 w-24" />

      {/* Search Bar */}
      <div className=" mr-4 flex w-[50%] max-w-md rounded-full bg-[#222222] text-white ring-1 ring-[#383838] ">
        <input
          type="text"
          placeholder="Search"
          className=" w-full rounded-l-full bg-[#000000] py-[0.4rem] pl-5  placeholder:text-neutral-400"
        />
        <img src={search} alt="" className="pointer-events-none mx-4 w-8" />
      </div>
    </div>
  );
};

export default Navbar;
