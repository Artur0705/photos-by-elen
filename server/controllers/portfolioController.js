const asyncHandler = require("express-async-handler");
const Portfolio = require("../models/portfolioModel");
const validateMongoDbId = require("../utils/validateMongoDbId");

exports.getAllPortfolioItems = asyncHandler(async (req, res, next) => {
  try {
    const portfolioItems = await Portfolio.find();
    res.json(portfolioItems);
  } catch (error) {
    next(error);
  }
});

exports.getPortfolioItemById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    validateMongoDbId(id);
    const portfolioItem = await Portfolio.findById(id);
    if (!portfolioItem) {
      res.status(404).send("Portfolio item not found");
      return;
    }
    res.json(portfolioItem);
  } catch (error) {
    next(error);
  }
});

exports.createPortfolioItem = asyncHandler(async (req, res, next) => {
  try {
    const newPortfolioItem = await Portfolio.create(req.body);
    res.status(200).json(newPortfolioItem);
  } catch (error) {
    next(error);
  }
});

exports.updatePortfolioItem = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    validateMongoDbId(id);
    const updatedPortfolioItem = await Portfolio.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedPortfolioItem) {
      res.status(404).send("Portfolio item not found");
      return;
    }
    res.json(updatedPortfolioItem);
  } catch (error) {
    next(error);
  }
});

exports.deletePortfolioItem = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    validateMongoDbId(id);
    const deletedPortfolioItem = await Portfolio.findByIdAndDelete(id);
    if (!deletedPortfolioItem) {
      res.status(404).send("Portfolio item not found");
      return;
    }
    res.json(deletedPortfolioItem);
  } catch (error) {
    next(error);
  }
});
