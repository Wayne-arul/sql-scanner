const express = require("express");
const router = express.Router();
const sqlmapService = require("../services/sqlmapService");
const Scan = require("../models/Scan");

router.post("/", async (req, res) => {
  const { url } = req.body;

  try {
    const taskId = await sqlmapService.createTask();
    await sqlmapService.startScan(taskId, url);

    let status;
    let attempts = 0;

    do {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      status = await sqlmapService.checkScanStatus(taskId);
      attempts++;
    } while (status !== "terminated" && attempts < 20);

    const data = await sqlmapService.getScanData(taskId);

    let payloads = [];

    if (data.length > 0) {
      for (const d of data) {
        if (d.type === 1 && Array.isArray(d.value)) {
          for (const value of d.value) {
            const dbms = value.dbms || "Unknown";
            const param = value.parameter;
            const vector = value.place;
            const payloadData = value.data || {};
            for (const key in payloadData) {
              payloads.push({
                parameter: param,
                attackVector: vector,
                payload: payloadData[key].payload,
                dbms: dbms,
              });
            }
          }
        }
      }
    }

    const scanResult = new Scan({
      url,
      vulnerable: payloads.length > 0,
      payloads
    });

    await scanResult.save();

    res.json({
      vulnerable: payloads.length > 0,
      details: payloads
    });

  } catch (err) {
    console.error("Scan error:", err.message);
    res.status(500).json({ error: "Scan failed" });
  }
});

module.exports = router;
