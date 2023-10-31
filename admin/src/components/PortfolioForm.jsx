import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPortfolio,
  updatePortfolio,
  getPortfolios,
} from "../features/portfolio/portfolioSlice";
import { uploadImage } from "../features/upload/uploadSlice";
import { notification } from "antd";

const PortfolioForm = ({ portfolioItem, onClose }) => {
  const dispatch = useDispatch();
  const { imageUrl } = useSelector((state) => state.upload);

  const [formData, setFormData] = useState(
    portfolioItem || {
      title: "",
      description: "",
      imageUrl: "",
      category: "",
    }
  );
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      setFormData((prevState) => ({
        ...prevState,
        imageUrl,
      }));
    }
  }, [imageUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: value ? "" : "Required",
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      dispatch(uploadImage(formData))
        .then((response) => {
          console.log("Image upload response:", response);
          setIsUploading(false);
        })
        .catch((error) => {
          console.error("Image upload error:", error);
          setIsUploading(false);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      title: formData.title ? "" : "Required",
      description: formData.description ? "" : "Required",
      category: formData.category ? "" : "Required",
      imageUrl: formData.imageUrl ? "" : "Required",
    };
    setErrors(newErrors);
    if (
      !(
        newErrors.title ||
        newErrors.description ||
        newErrors.category ||
        newErrors.imageUrl
      )
    ) {
      if (portfolioItem) {
        dispatch(
          updatePortfolio({
            portfolioId: portfolioItem._id,
            portfolioData: formData,
          })
        ).then((result) => {
          if (result.type.endsWith("fulfilled")) {
            notification.success({
              message: "Success",
              description: "Portfolio updated successfully!",
            });
          } else {
            notification.error({
              message: "Error",
              description: "Something went wrong!",
            });
          }
          dispatch(getPortfolios());
        });
      } else {
        dispatch(createPortfolio(formData)).then((result) => {
          if (result.type.endsWith("fulfilled")) {
            notification.success({
              message: "Success",
              description: "Portfolio created successfully!",
            });
          } else {
            notification.error({
              message: "Error",
              description: "Something went wrong!",
            });
          }
          dispatch(getPortfolios());
        });
      }
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
      />
      {errors.title && <div className="text-red-500">{errors.title}</div>}
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
        rows="4"
      />
      {errors.description && (
        <div className="text-red-500">{errors.description}</div>
      )}
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
      />
      {errors.category && <div className="text-red-500">{errors.category}</div>}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full p-2 border rounded"
      />
      {errors.imageUrl && <div className="text-red-500">{errors.imageUrl}</div>}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-200 text-black py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded"
          disabled={isUploading}
        >
          {portfolioItem ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default PortfolioForm;
