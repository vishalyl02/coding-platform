// const express = require("express");
// const User = require("../models/User");

// const router = express.Router();

// // ✅ Submit Test (Lock test forever)
// router.post("/submit", async (req, res) => {
//   try {
//     const { userId } = req.body;

//     if (!userId) {
//       return res.status(400).json({ message: "User ID required" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.testSubmitted = true;
//     await user.save();

//     res.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/submit", async (req, res) => {
  console.log("🚀 /test/submit HIT");
  console.log("➡️ BODY:", req.body);

  const { userId } = req.body;

  if (!userId) {
    console.log("❌ NO USER ID");
    return res.status(401).json({ message: "User not logged in" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log("❌ USER NOT FOUND");
      return res.status(404).json({ message: "User not found" });
    }

    user.testSubmitted = true;
    user.lastSubmissionAt = new Date();

    await user.save();

    console.log("✅ TEST MARKED AS SUBMITTED");
    console.log("👤 USER:", user.username);

    res.json({ success: true });
  } catch (err) {
    console.error("🔥 TEST SUBMIT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
