// anvaya-backend/routes/leadRoutes.js
const express = require("express");
const router = express.Router();

const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");

const {
  addComment,
  getComments,
} = require("../controllers/commentController");

router.post("/", createLead);
router.get("/", getLeads);
router.get("/:id", getLeadById);       // NEW
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);
router.post("/:id/comments", addComment);
router.get("/:id/comments", getComments);

module.exports = router;