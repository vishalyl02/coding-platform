const express = require("express");
const Submission = require("../models/Submission");
const router = express.Router();

router.get("/:userId/:problemId", async (req, res) => {
  const { userId, problemId } = req.params;

  const submission = await Submission.findOne({ userId, problemId });

  if (!submission) return res.json({});

  res.json(submission);
});

module.exports = router;
