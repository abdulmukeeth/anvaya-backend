const express = require("express");
const router = express.Router();

const {
  createAgent,
  getAgents,
  deleteAgent,
} = require("../controllers/agentController");

router.post("/", createAgent);
router.get("/", getAgents);
router.delete("/:id", deleteAgent);

module.exports = router;