import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPortfolios,
  deletePortfolio,
} from "../features/portfolio/portfolioSlice";
import PortfolioForm from "../components/PortfolioForm";
import { Popconfirm, message, notification, Spin } from "antd";

const PortfolioPage = () => {
  const dispatch = useDispatch();
  const { portfolios, isLoading, isError } = useSelector(
    (state) => state.portfolio
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(getPortfolios());
  }, [dispatch]);

  const handleOpenForm = (portfolio) => {
    setEditing(portfolio);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditing(null);
    setIsFormOpen(false);
  };

  const handleDelete = (portfolioId) => {
    dispatch(deletePortfolio(portfolioId)).then((result) => {
      if (result.type.endsWith("fulfilled")) {
        notification.success({
          message: "Success",
          description: "Portfolio deleted successfully!",
        });
        dispatch(getPortfolios());
      } else {
        notification.error({
          message: "Error",
          description: "Something went wrong!",
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading portfolios</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl mb-6 text-center">Portfolio</h1>
        <button
          onClick={() => handleOpenForm(null)}
          className="mb-6 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          disabled={isLoading}
        >
          Create New Portfolio Item
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => (
            <div
              key={portfolio._id}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <img
                src={portfolio.imageUrl}
                alt={portfolio.title}
                className="w-full h-48 object-cover mb-4 rounded-t-lg"
              />
              <h2 className="text-xl font-bold mb-2">{portfolio.title}</h2>
              <p className="text-gray-700 mb-4">{portfolio.description}</p>
              <p className="text-gray-700 mb-4">{portfolio.category}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleOpenForm(portfolio)}
                  className="text-indigo-600 hover:underline"
                  disabled={isLoading}
                >
                  Edit
                </button>
                <Popconfirm
                  title="Are you sure you want to delete this portfolio?"
                  onConfirm={() => handleDelete(portfolio._id)}
                  onCancel={() => message.info("Delete cancelled")}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{
                    className: "bg-red-600 text-white hover:bg-red-700",
                  }}
                >
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </Popconfirm>
              </div>
            </div>
          ))}
        </div>
        {isFormOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
              <button
                onClick={handleCloseForm}
                className="absolute top-4 right-4 text-xl"
              >
                &times;
              </button>
              <PortfolioForm
                portfolioItem={editing}
                onClose={handleCloseForm}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
