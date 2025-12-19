const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://vishalyadavvns12345_db_user:hello@cluster0.alnfjyu.mongodb.net/");
    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    console.error("MongoDB connection error ❌:", error.message);
    // ❌ DO NOT exit process on Vercel
  }
};

module.exports = connectDB;
