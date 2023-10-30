const FAQ = require("../models/faqModel");
const asyncHandler = require("express-async-handler");

exports.getFAQs = asyncHandler(async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).send(faqs);
  } catch (error) {
    res.status(400).send(error);
  }
});

exports.createFAQ = asyncHandler(async (req, res) => {
  try {
    const faq = new FAQ(req.body);
    await faq.save();
    res.status(200).send(faq);
  } catch (error) {
    res.status(400).send(error);
  }
});

exports.updateFAQ = asyncHandler(async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!faq) {
      return res.status(404).send();
    }
    res.status(200).send(faq);
  } catch (error) {
    res.status(400).send(error);
  }
});

exports.deleteFAQ = asyncHandler(async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).send();
    }
    res.status(200).send(faq);
  } catch (error) {
    res.status(400).send(error);
  }
});
