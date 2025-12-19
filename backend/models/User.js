// const mongoose = require("mongoose");

// /* ---------- Per Problem Submission ---------- */
// const SubmissionSchema = new mongoose.Schema({
//   problemId: {
//     type: Number,
//     required: true,
//   },

//   code: {
//     type: String,
//     required: true,
//   },

//   language: {
//     type: String,
//     enum: ["cpp", "java", "python"],
//     default: "cpp",
//   },

//   score: {
//     type: Number,
//     default: 0,
//   },

//   submittedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// /* ---------- User Schema ---------- */
// const UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },

//   password: {
//     type: String,
//     required: true,
//   },

//   /* 🔥 All problem submissions */
//   submissions: [SubmissionSchema],

//   /* 🔥 Total score across all problems */
//   totalScore: {
//     type: Number,
//     default: 0,
//   },

//   /* 🔥 Lock test after final submission */
//   testSubmitted: {
//     type: Boolean,
//     default: false,
//   },

//   lastSubmissionAt: {
//     type: Date,
//   },
// });

// module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  problemId: String,
  code: String,
  language: String,
  score: Number,
  submittedAt: Date,
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // ✅ MUST EXIST
  problemScores: {
    type: Map,
    of: Number,
    default: () => new Map(),   // 🔥 IMPORTANT
  },

  submissions: {
    type: [SubmissionSchema],
    default: [],
  },

  totalScore: {
    type: Number,
    default: 0,
  },

  testSubmitted: {
    type: Boolean,
    default: false,
  },

  lastSubmissionAt: Date,
});

module.exports = mongoose.model("User", UserSchema);
