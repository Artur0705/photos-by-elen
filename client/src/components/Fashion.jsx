import React from "react";
import { Link } from "react-router-dom";

const Fashion = () => {
  return (
    <div className="h-screen w-full text-twhite mt-40">
      <div className="flex h-screen w-full absolute bg-zinc-300 opacity-50"></div>
      <div className="flex flex-col h-screen w-full justify-center items-center absolute z-40">
        <p className="text-center text-4xl tracking-widest uppercase">
          Newborn Photography
        </p>
        <p className="text-center text-xl italic mt-2 tracking-widest">
          Cherished Moments, Gentle Portraits, Tender Memories
        </p>
        <p className="text-center text-sm italic mt-2 tracking-widest">
          Preserve the tender moments of your newborn's early days with our
          professional photography services. <br />
          Our gentle and patient approach ensures a comfortable and enjoyable
          experience for both parents and baby. <br />
          Let's capture these cherished memories together, creating beautiful
          portraits you'll treasure forever.
        </p>
        <Link to="/portfolio">
          <button className="btn text-center">view more</button>
        </Link>
      </div>
      <img
        src="https://scontent.fmel8-1.fna.fbcdn.net/v/t39.30808-6/356064067_651834983657126_2003273908126431872_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=qxyapagm0Y0AX-aiM-s&_nc_ht=scontent.fmel8-1.fna&oh=00_AfB7q6Tdtaz3PcMRA9x5SC8va-q8aJ4WVw4PtPMpDRAj4A&oe=65443064"
        alt="fashion"
        className="h-screen w-full md:object-contain object-cover z-0 overflow-scroll"
      />
    </div>
  );
};

export default Fashion;
