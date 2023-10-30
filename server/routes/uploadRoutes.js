const express = require("express");
const uploadController = require("../controllers/uploadController");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/", uploadMiddleware.single("file"), uploadController.uploadImage);

module.exports = router;
