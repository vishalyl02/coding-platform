const mongoose = require("mongoose");

const TestAttemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  submitted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("TestAttempt", TestAttemptSchema);
