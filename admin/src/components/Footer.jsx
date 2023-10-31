import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 p-4 text-white text-center">
      <div className="container mx-auto">
        <p> &copy; {currentYear} Photos by Elen. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
