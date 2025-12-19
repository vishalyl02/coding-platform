const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  problemId: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    default: "cpp",
  },
  code: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Submission", SubmissionSchema);
