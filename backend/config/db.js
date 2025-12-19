const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://Vercel-Admin-coding-platform:MKY7SMmRfjehUJGc@coding-platform.3oax8gr.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("MongoDB Error ❌", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
