import React from "react";
import { useParams } from "react-router-dom";

const Channel = () => {
  let { channelId } = useParams();

  return (
    <>
      {/* <h1 className='text-white'>
      Channel : {channelId}
    </h1> */}
      {/* Main Container */}
      <div className="flex flex-col">
        {/* Container for Banner & Channel Details */}
        <div className="mx-3  md:mx-10 lg:mx-24">
          {/* Channel Banner */}
          <img
            src="https://yt3.googleusercontent.com/IHsFb5t8eC5-Lr742a2_4fpmr6QPSRatY2oEHlDHJiaKjkXOBQ1AA_O-3iKTo50fPPrH_RgdzQ=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
            className="aspect-[4/1] rounded-lg object-cover md:aspect-auto md:rounded-xl"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Channel;
