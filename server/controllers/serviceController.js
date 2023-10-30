const Service = require("../models/serviceModel");
const validateMongoDbId = require("../utils/validateMongoDbId");
const asyncHandler = require("express-async-handler");

exports.getAllServices = asyncHandler(async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    throw new Error(error);
  }
});

exports.getServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDbId(id);
    const getAservice = await Service.findById(id);
    res.json(getAservice);
  } catch (error) {
    throw new Error(error);
  }
});

exports.createService = asyncHandler(async (req, res) => {
  try {
    const newService = await Service.create(req.body);
    res.json(newService);
  } catch (error) {
    throw new Error(error);
  }
});

exports.editService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const editService = await Service.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json(editService);
});

exports.deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteService = await Service.findByIdAndDelete(id);
    res.json(deleteService);
  } catch (error) {
    throw new Error(error);
  }
});
