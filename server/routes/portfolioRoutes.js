const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/portfolioController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/", portfolioController.getAllPortfolioItems);
router.get("/:id", portfolioController.getPortfolioItemById);
router.post("/", verifyToken, portfolioController.createPortfolioItem);
router.put("/:id", verifyToken, portfolioController.updatePortfolioItem);
router.delete("/:id", verifyToken, portfolioController.deletePortfolioItem);

module.exports = router;
