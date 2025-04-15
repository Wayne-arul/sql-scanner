const express = require("express");
const cors = require("cors");
const sqlmapService = require("./sqlmapService");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

app.post("/scan", async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    try {
        const results = await sqlmapService.scanUrl(url);
        res.json({ vulnerable: results.vulnerable, details: results.details });
    } catch (error) {
        console.error("Error scanning URL:", error);
        res.status(500).json({ error: "Error scanning URL" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
