// server.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path"); // ✅ Import path

const scanRoutes = require("./routes/scan");
const analyticsRoutes = require("./routes/analytics");
const historyRoutes = require("./routes/history");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/history", historyRoutes);
app.use("/scan", scanRoutes);
app.use("/api", analyticsRoutes);

// Serve React frontend
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// DB connection
mongoose.connect("mongodb://localhost:27017/sqlscanner", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
