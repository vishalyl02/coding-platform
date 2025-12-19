const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const User = require("../models/User"); // 🔥 ADD THIS

// Auth routes
router.post("/register", register);
router.post("/login", login);

// 🔥 ADD THIS ROUTE (VERY IMPORTANT)
router.get("/me/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("❌ /auth/me error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
