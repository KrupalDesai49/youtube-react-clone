import React from "react";
import logo from "../assets/youtube_name_logo.svg";
import search from "../assets/search.svg";
import { Link,useNavigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";

const Navbar = () => {

  const {user, logOut} = UserAuth()
  const navigate=useNavigate()
  console.log(user)

  const handleLogout = async()=>{
    try{
      await logOut()
      navigate('/')
    
    }catch(e){
      console.log(e)
    }
    }

  return (
    <div className="flex justify-between  py-4 font-roboto z-[100]">
      {/* Logo */}
      <Link to='/' className="">
      <img src={logo} alt="" className="mx-6 w-24" />
      </Link>
      {/* Search Bar */}
      <div className=" mr-4 flex w-[50%] max-w-md rounded-full bg-[#222222] text-white ring-1 ring-[#383838] ">
        <input
          type="text"
          placeholder="Search"
          className=" w-full rounded-l-full bg-[#000000] py-[0.4rem] pl-5  placeholder:text-neutral-400"
        />
        <img src={search} alt="" className="pointer-events-none mx-4 w-8" />
      </div>

      {/* Log In & Sign in */}
      {user?.email? <div>
        <Link to="/account">
          <button className="pr-4 text-white">Account</button>{" "}
        </Link>
          <button onClick={handleLogout} className="cursor-pointer rounded bg-[#e50914] px-6 py-2 text-white">
            Logout
          </button>
      </div>
      :
      <div>
        <Link to="/login">
          <button className="pr-4 text-white">Sign In</button>{" "}
        </Link>
        <Link to="/signup">
          <button className="cursor-pointer rounded bg-[#e50914] px-6 py-2 text-white">
            Sign Up
          </button>
        </Link>
      </div>}
    </div>
  );
};

export default Navbar;
