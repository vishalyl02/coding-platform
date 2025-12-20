const User = require("../models/User");

/* -------- REGISTER -------- */
exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ success: false, message: "Missing fields ❌" });
  }

  const existing = await User.findOne({ username });
  if (existing) {
    return res.json({ success: false, message: "User already exists ❌" });
  }

  const user = new User({ username, password });
  await user.save();

  res.json({ success: true, message: "User registered ✅" });
};

/* -------- LOGIN -------- */
exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });
  if (!user) {
    return res.json({ success: false, message: "Invalid credentials ❌" });
  }

  res.json({
    success: true,
    message: "Login successful ✅",
    user: {
      id: user._id,
      username: user.username,
    },
  });
};

/* -------- GET USER BY ID (for refreshUser) -------- */
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("📥 GET /auth/me/:userId called with:", userId);

    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: "User ID is required" 
      });
    }

    const user = await User.findById(userId);
    
    if (!user) {
      console.log("❌ User not found:", userId);
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    console.log("✅ User found:", { id: user._id, username: user.username });

    res.json({
      id: user._id,
      username: user.username,
      // Add any other user fields you need
    });
  } catch (err) {
    console.error("❌ Error in getUserById:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error",
      error: err.message 
    });
  }
};