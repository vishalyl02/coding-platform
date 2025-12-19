const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const runRoutes = require("./routes/run.routes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
const leaderboardRoutes = require("./routes/leaderboard.routes");

app.use("/leaderboard", leaderboardRoutes);


app.use("/auth", authRoutes);
app.use("/run", runRoutes);
app.use("/test", require("./routes/test.routes"));
app.use("/submission", require("./routes/submission.routes"));

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});
