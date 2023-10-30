import React from "react";
import { Link } from "react-router-dom";

const ChristmasPhoto = () => {
  return (
    <div className="h-screen w-full text-twhite mt-40">
      <div className="flex h-screen w-full absolute bg-zinc-300 opacity-50"></div>
      <div className="flex flex-col h-screen w-full justify-center items-center absolute z-40">
        <p className="text-center text-4xl tracking-widest uppercase">
          Christmas Photography
        </p>
        <p className="text-center text-xl italic mt-2">
          Family Gatherings, Holiday Portraits, Festive Events
        </p>
        <p className="text-center text-sm italic mt-2 tracking-widest">
          Capture the magic of the holiday season with professional photography.{" "}
          <br />
          Whether it's an editorial shoot, commercial project, or family
          portraits, <br />
          experience a personalized photo session that highlights the joy and
          warmth of Christmas.
        </p>
        <Link to="/portfolio">
          <button className="btn text-center">view more</button>
        </Link>
      </div>
      <img
        src="https://scontent.fmel8-1.fna.fbcdn.net/v/t39.30808-6/329232547_494318809550288_780656250072429224_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=LVLJkWEWP6QAX-eJWak&_nc_ht=scontent.fmel8-1.fna&oh=00_AfACsEBXSCrbUvsFTwHJpJXMCas_OTU8aFdwcaxFpzpCnw&oe=6543B777"
        alt="Christmas"
        className="h-screen w-full md:object-contain object-cover z-0 overflow-scroll"
      />
    </div>
  );
};

export default ChristmasPhoto;
