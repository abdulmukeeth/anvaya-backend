const Lead = require("../models/lead");

// POST /leads
exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    const populated = await lead.populate("salesAgent");
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /leads (with filtering)
exports.getLeads = async (req, res) => {
  try {
    const { salesAgent, status, source, tags } = req.query;
    let filter = {};
    if (salesAgent) filter.salesAgent = salesAgent;
    if (status) filter.status = status;
    if (source) filter.source = source;
    if (tags) filter.tags = { $in: Array.isArray(tags) ? tags : [tags] };

    const leads = await Lead.find(filter).populate("salesAgent").sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /leads/:id  ← NEW: single lead endpoint
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate("salesAgent");
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /leads/:id
exports.updateLead = async (req, res) => {
  try {
    const body = { ...req.body };

    // Fetch existing lead first to check if closedAt is already set
    const existing = await Lead.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: "Lead with ID '" + req.params.id + "' not found." });
    }

    // Only stamp closedAt the FIRST time status becomes Closed
    if (body.status === "Closed" && !existing.closedAt) {
      body.closedAt = new Date();
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate("salesAgent");

    res.json(updatedLead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /leads/:id
exports.deleteLead = async (req, res) => {
  try {
    const deleted = await Lead.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Lead with ID '" + req.params.id + "' not found." });
    }
    res.json({ message: "Lead deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};