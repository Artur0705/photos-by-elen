import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="h-80 text-twhite w-full flex flex-col justify-end items-center mt-4">
        <div className="w-full mt-14 border-t-2"></div>
        <div className="w-full mt-2 text-center text-zinc-500">
          &copy; {currentYear} Photos by Elen. All rights reserved.
        </div>

        <div className="flex flex-row justify-center mb-2 space-x-4">
          <Link
            to="/terms-and-conditions"
            className="text-zinc-400 hover:text-zinc-300"
          >
            T&C's &nbsp; |
          </Link>
          <Link
            to="https://www.instagram.com/elensnkhchyanphoto/?hl=en"
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-300"
          >
            <span>Instagram</span>
            <FaInstagram className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
