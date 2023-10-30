const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const {
  getAllServices,
  getServiceById,
  createService,
  editService,
  deleteService,
} = require("../controllers/serviceController");

router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post("/", verifyToken, createService);
router.put("/:id", verifyToken, editService);
router.delete("/:id", verifyToken, deleteService);

module.exports = router;
