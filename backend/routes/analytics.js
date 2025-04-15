const express = require("express");
const router = express.Router();
const Scan = require("../models/Scan");
const mongoose = require("mongoose");

// Get analytics data
router.get("/analytics", async (req, res) => {
  try {
    // 1. Scans per day (last 7 days)
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 6); // last 7 days

    const scans = await Scan.find({ scannedAt: { $gte: lastWeek } });

    const scansPerDay = {};
    const sqliTypes = {};
    let vulnerable = 0;
    let notVulnerable = 0;

    for (let i = 0; i < 7; i++) {
      const day = new Date();
      day.setDate(day.getDate() - i);
      scansPerDay[day.toISOString().split("T")[0]] = 0;
    }

    scans.forEach((scan) => {
      const day = scan.scannedAt.toISOString().split("T")[0];
      scansPerDay[day] = (scansPerDay[day] || 0) + 1;

      if (scan.vulnerable) vulnerable++;
      else notVulnerable++;

      scan.payloads.forEach((p) => {
        sqliTypes[p.attackVector] = (sqliTypes[p.attackVector] || 0) + 1;
      });
    });

    res.json({
      scansPerDay,
      vulnerabilityStats: {
        vulnerable,
        notVulnerable,
      },
      sqliTypes,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

module.exports = router;
