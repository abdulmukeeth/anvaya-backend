// anvaya-backend/routes/reportRoutes.js
const express = require("express");
const router = express.Router();

const {
  getLeadsClosedLastWeek,
  getPipeline,
  getClosedByAgent,
  getStatusDistribution,
} = require("../controllers/reportController");

router.get("/last-week", getLeadsClosedLastWeek);
router.get("/pipeline", getPipeline);
router.get("/closed-by-agent", getClosedByAgent);
router.get("/status-distribution", getStatusDistribution);

module.exports = router;