
const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  problemId: String,
  code: String,
  language: String,
  score: Number,
  submittedAt: Date,
});

const CodeSaveSchema = new mongoose.Schema({
  testId: { type: String, required: true },
  problemId: { type: String, required: true },
  code: { type: String, default: "" },
  language: { type: String, default: "cpp" },
  lastSavedAt: { type: Date, default: Date.now },
  solved: { type: Boolean, default: false },
  bestScore: { type: Number, default: 0 }
});

const TestSubmissionSchema = new mongoose.Schema({
  testId: { type: String, required: true },
  submitted: { type: Boolean, default: false },
  submittedAt: Date,
  score: { type: Number, default: 0 },
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  problemScores: {
    type: Map,
    of: Number,
    default: () => new Map(),
  },
  submissions: {
    type: [SubmissionSchema],
    default: [],
  },
  totalScore: {
    type: Number,
    default: 0,
  },
  codeSaves: {
    type: [CodeSaveSchema],
    default: [],
  },
  testSubmissions: {
    type: [TestSubmissionSchema],
    default: [],
  },
  lastSubmissionAt: Date,
});

UserSchema.methods.isTestSubmitted = function(testId) {
  const submission = this.testSubmissions.find(
    sub => sub.testId === testId.toString()
  );
  return submission?.submitted || false;
};

// 🆕 NEW: Calculate total score for a specific test
UserSchema.methods.calculateTestScore = function(testId) {
  const testProblems = this.codeSaves.filter(
    save => save.testId === testId.toString()
  );
  
  return testProblems.reduce((total, problem) => {
    return total + (problem.bestScore || 0);
  }, 0);
};

// 🆕 UPDATED: Submit test with calculated score
UserSchema.methods.submitTest = function(testId, score = null) {
  // If no score provided, calculate it from problems
  const finalScore = score !== null ? score : this.calculateTestScore(testId);
  
  const existingIndex = this.testSubmissions.findIndex(
    sub => sub.testId === testId.toString()
  );

  if (existingIndex >= 0) {
    this.testSubmissions[existingIndex].submitted = true;
    this.testSubmissions[existingIndex].submittedAt = new Date();
    this.testSubmissions[existingIndex].score = finalScore;
  } else {
    this.testSubmissions.push({
      testId: testId.toString(),
      submitted: true,
      submittedAt: new Date(),
      score: finalScore,
    });
  }

  this.lastSubmissionAt = new Date();
  this.markModified('testSubmissions');
  
  return finalScore;
};

// 🆕 NEW: Update test score when problems are solved (even if not submitted)
UserSchema.methods.updateTestScore = function(testId) {
  const testScore = this.calculateTestScore(testId);
  
  const existingIndex = this.testSubmissions.findIndex(
    sub => sub.testId === testId.toString()
  );

  if (existingIndex >= 0) {
    this.testSubmissions[existingIndex].score = testScore;
  } else {
    // Create entry for test (not submitted yet, but has score)
    this.testSubmissions.push({
      testId: testId.toString(),
      submitted: false,
      score: testScore,
    });
  }
  
  this.markModified('testSubmissions');
  return testScore;
};

UserSchema.methods.getSavedCode = function(testId, problemId) {
  const save = this.codeSaves.find(
    s => s.testId === testId.toString() && s.problemId === problemId.toString()
  );
  return save || null;
};

UserSchema.methods.saveCode = function(testId, problemId, code, language) {
  const existingIndex = this.codeSaves.findIndex(
    s => s.testId === testId.toString() && s.problemId === problemId.toString()
  );

  if (existingIndex >= 0) {
    this.codeSaves[existingIndex].code = code;
    this.codeSaves[existingIndex].language = language;
    this.codeSaves[existingIndex].lastSavedAt = new Date();
  } else {
    this.codeSaves.push({
      testId: testId.toString(),
      problemId: problemId.toString(),
      code: code,
      language: language,
      lastSavedAt: new Date(),
      solved: false,
      bestScore: 0
    });
  }
  
  this.markModified('codeSaves');
};

UserSchema.methods.updateProblemScore = function(testId, problemId, newScore) {
  const existingIndex = this.codeSaves.findIndex(
    s => s.testId === testId.toString() && s.problemId === problemId.toString()
  );

  if (existingIndex >= 0) {
    const currentBest = this.codeSaves[existingIndex].bestScore || 0;
    if (newScore > currentBest) {
      this.codeSaves[existingIndex].bestScore = newScore;
      this.codeSaves[existingIndex].solved = newScore === 100;
      this.markModified('codeSaves');
      return true;
    }
    return false;
  } else {
    this.codeSaves.push({
      testId: testId.toString(),
      problemId: problemId.toString(),
      code: "",
      language: "cpp",
      lastSavedAt: new Date(),
      solved: newScore === 100,
      bestScore: newScore
    });
    this.markModified('codeSaves');
    return true;
  }
};

module.exports = mongoose.model("User", UserSchema);