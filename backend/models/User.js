const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  problemId: String,
  code: String,
  language: String,
  score: Number,
  submittedAt: Date,
});

// 🔥 NEW: Track each test submission separately
const TestSubmissionSchema = new mongoose.Schema({
  testId: { type: String, required: true },
  submitted: { type: Boolean, default: false },
  submittedAt: Date,
  score: { type: Number, default: 0 },
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Problem scores (per problem)
  problemScores: {
    type: Map,
    of: Number,
    default: () => new Map(),
  },

  // All submissions
  submissions: {
    type: [SubmissionSchema],
    default: [],
  },

  // Total score across all problems
  totalScore: {
    type: Number,
    default: 0,
  },

  // 🔥 NEW: Track test submissions per test
  testSubmissions: {
    type: [TestSubmissionSchema],
    default: [],
  },

  // 🔥 DEPRECATED: Remove this after migration
  // testSubmitted: {
  //   type: Boolean,
  //   default: false,
  // },

  lastSubmissionAt: Date,
});

// Helper method to check if a specific test is submitted
UserSchema.methods.isTestSubmitted = function(testId) {
  const submission = this.testSubmissions.find(
    sub => sub.testId === testId.toString()
  );
  return submission?.submitted || false;
};

// Helper method to submit a test
UserSchema.methods.submitTest = function(testId, score = 0) {
  const existingIndex = this.testSubmissions.findIndex(
    sub => sub.testId === testId.toString()
  );

  if (existingIndex >= 0) {
    this.testSubmissions[existingIndex].submitted = true;
    this.testSubmissions[existingIndex].submittedAt = new Date();
    this.testSubmissions[existingIndex].score = score;
  } else {
    this.testSubmissions.push({
      testId: testId.toString(),
      submitted: true,
      submittedAt: new Date(),
      score: score,
    });
  }

  this.lastSubmissionAt = new Date();
};

module.exports = mongoose.model("User", UserSchema);