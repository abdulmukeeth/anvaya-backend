const Comment = require("../models/comment");

// POST /leads/:id/comments
exports.addComment = async (req, res) => {
  try {
    const { commentText, author } = req.body;

    const comment = await Comment.create({
      lead: req.params.id,
      author,
      commentText,
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /leads/:id/comments
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      lead: req.params.id,
    }).populate("author");

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

