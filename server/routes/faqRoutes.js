const express = require("express");
const faqController = require("../controllers/faqController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", faqController.getFAQs);
router.post("/", verifyToken, faqController.createFAQ);
router.put("/:id", verifyToken, faqController.updateFAQ);
router.delete("/:id", verifyToken, faqController.deleteFAQ);

module.exports = router;
