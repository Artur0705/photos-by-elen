const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    totalPeoplePhoto: {
      type: Number,
      required: true,
    },

    applicationAddress: {
      type: String,
    },
    addedQuestionsOrInfo: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Resolved"],
      default: "New",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
