const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema({
  url: String,
  vulnerable: Boolean,
  scannedAt: { type: Date, default: Date.now },
  payloads: [
    {
      parameter: String,
      attackVector: String,
      payload: String,
      dbms: String,
    }
  ]
});

module.exports = mongoose.model("Scan", scanSchema);
