const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  duration: {
    type: Number,
    required: true,
    min: 0,
  },
  disclaimer: {
    type: String,
  },
});

module.exports = mongoose.model("Service", serviceSchema);
