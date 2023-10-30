const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/", contactController.createContact);
router.get("/", verifyToken, contactController.getAllContacts);
router.get("/:id", verifyToken, contactController.getContact);
router.patch("/:id/status", verifyToken, contactController.updateContactStatus);
router.delete("/:id", verifyToken, contactController.deleteContact);

module.exports = router;
