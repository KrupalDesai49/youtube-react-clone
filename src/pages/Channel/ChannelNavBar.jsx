import React from "react";
import { NavLink } from "react-router-dom";
const ChannelNavBar = ({ channelId }) => {
  return (
    <div className="mt-3">
      {/* Navbar Container */}
      <div className="mx-3 flex space-x-6 md:mx-10 lg:mx-24 ">
        <NavLink
          to={`/channel/${channelId}/videoes`}
          className="py-3 font-[600]  text-[#aaaaaa]"
        >
          Video
        </NavLink>
        <NavLink
          to={`/channel/${channelId}/shorts`}
          className="py-3 font-[600] text-[#aaaaaa]"
        >
          Short
        </NavLink>
        <NavLink
          to={`/channel/${channelId}/about`}
          className="py-3 font-[600] text-[#aaaaaa]"
        >
          About Us
        </NavLink>
      </div>
      {/* breaking point */}
      <div className="w-full border-b border-[#3f3f3f]"></div>
    </div>
  );
};

export default ChannelNavBar;
