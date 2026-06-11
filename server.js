const { initializeDatabase } = require("./db/db.connect");
const express = require("express");
const app = express();
app.use(express.json());
initializeDatabase();
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Anvaya App Backend is Running");
});

const agentRoutes = require("./routes/agentRoutes");
const leadRoutes = require("./routes/leadRoutes");
const reportRoutes = require("./routes/reportRoutes");

app.use("/agents", agentRoutes);
app.use("/leads", leadRoutes);
app.use("/report", reportRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});