const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/", adminController.login);
router.post("/logout", verifyToken, adminController.logout);

module.exports = router;
