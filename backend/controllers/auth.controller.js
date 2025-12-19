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
