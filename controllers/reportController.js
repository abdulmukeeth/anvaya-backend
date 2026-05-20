const Lead = require("../models/lead");

// GET /report/last-week
exports.getLeadsClosedLastWeek = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const leads = await Lead.find({
      status: "Closed",
      closedAt: { $gte: sevenDaysAgo },
    }).populate("salesAgent");

    const result = leads.map((l) => ({
      id: l._id,
      name: l.name,
      salesAgent: l.salesAgent?.name || "Unassigned",
      closedAt: l.closedAt,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /report/pipeline
exports.getPipeline = async (req, res) => {
  try {
    const statuses = ["New", "Contacted", "Qualified", "Proposal Sent"];
    const counts = await Lead.aggregate([
      { $match: { status: { $in: statuses } } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const totalLeadsInPipeline = counts.reduce((acc, c) => acc + c.count, 0);
    const byStatus = {};
    counts.forEach((c) => (byStatus[c._id] = c.count));

    res.json({ totalLeadsInPipeline, byStatus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /report/closed-by-agent
exports.getClosedByAgent = async (req, res) => {
  try {
    const results = await Lead.aggregate([
      { $match: { status: "Closed" } },
      { $group: { _id: "$salesAgent", count: { $sum: 1 } } },
      {
        $lookup: {
          from: "salesagents",
          localField: "_id",
          foreignField: "_id",
          as: "agent",
        },
      },
      { $unwind: { path: "$agent", preserveNullAndEmpty: true } },
      {
        $project: {
          agentName: { $ifNull: ["$agent.name", "Unknown"] },
          count: 1,
        },
      },
    ]);

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /report/status-distribution
exports.getStatusDistribution = async (req, res) => {
  try {
    const results = await Lead.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};