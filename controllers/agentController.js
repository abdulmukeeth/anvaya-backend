const SalesAgent = require("../models/salesAgent");

// POST /agents
exports.createAgent = async (req, res) => {
  try {
    const { name, email } = req.body;

    const agent = await SalesAgent.create({ name, email });

    res.status(201).json(agent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /agents
exports.getAgents = async (req, res) => {
  try {
    const agents = await SalesAgent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};