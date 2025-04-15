const express = require("express");
const router = express.Router();
const Scan = require("../models/Scan");

router.get("/", async (req, res) => {
  try {
    const scans = await Scan.find().sort({ scannedAt: -1 });
    res.json(scans);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch scan history" });
  }
});

module.exports = router;
