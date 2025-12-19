const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const runRoutes = require("./routes/run.routes");
const leaderboardRoutes = require("./routes/leaderboard.routes");

const app = express();

// ✅ Connect DB (safe on Vercel)
connectDB();

app.use(cors());
app.use(express.json());

app.use("/leaderboard", leaderboardRoutes);
app.use("/auth", authRoutes);
app.use("/run", runRoutes);
app.use("/test", require("./routes/test.routes"));
app.use("/submission", require("./routes/submission.routes"));

// ✅ Export instead of listen
module.exports = app;
