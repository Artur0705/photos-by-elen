import React from "react";

const Gallery = ({ images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative group overflow-hidden rounded-lg shadow-lg"
        >
          <img
            src={image.imageUrl}
            alt={image.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <span className="text-white text-lg font-bold">{image.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
