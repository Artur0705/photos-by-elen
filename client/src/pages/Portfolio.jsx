import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPortfolios } from "../features/portfolio/portfolioSlice";
import Layout from "../components/Layout";

import Gallery from "../components/Gallery";
import Select from "react-select";
import { Result, Spin } from "antd";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#222",
    borderColor: "#444",
    color: "#fff",
    minHeight: "48px",
    borderRadius: "8px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#555" : "#222",
    color: "#fff",
    padding: "10px",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#222",
    borderRadius: "8px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

const Portfolio = () => {
  const dispatch = useDispatch();
  const { portfolios, isLoading, isError } = useSelector(
    (state) => state?.portfolio
  );

  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredPortfolios, setFilteredPortfolios] = useState(portfolios);

  useEffect(() => {
    dispatch(getPortfolios());
  }, [dispatch]);

  useEffect(() => {
    setFilteredPortfolios(
      selectedCategory
        ? portfolios.filter(
            (portfolio) => portfolio.category === selectedCategory
          )
        : portfolios
    );
  }, [portfolios, selectedCategory]);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption ? selectedOption.value : "");
  };

  const categories = [
    { value: "", label: "All" },
    ...[...new Set(portfolios.map((item) => item.category))].map(
      (category) => ({ value: category, label: category })
    ),
  ];

  return (
    <Layout>
      {isLoading && (
        <div className="flex justify-center items-center min-h-screen">
          <Spin size="large" />
        </div>
      )}
      {isError && (
        <div className="flex justify-center items-center min-h-screen">
          <Result status="401" subTitle="Error loading services." />
        </div>
      )}
      <div className="px-4 py-8 md:mt-10 mt-0">
        <div className="max-w-md mx-auto mb-10">
          <Select
            options={categories}
            onChange={handleCategoryChange}
            isSearchable
            styles={customStyles}
            placeholder="Select a category"
          />
        </div>
        <Gallery images={filteredPortfolios} />
      </div>
    </Layout>
  );
};

export default Portfolio;
