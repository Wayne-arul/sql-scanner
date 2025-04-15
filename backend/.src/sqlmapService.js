const axios = require("axios");

const SQLMAP_API_URL = "http://127.0.0.1:7000"; // sqlmap API server

async function scanUrl(url) {
    try {
        // 1. Create a new scan task
        const { data: task } = await axios.get(`${SQLMAP_API_URL}/task/new`);
        if (!task.success) throw new Error("Failed to create sqlmap task");
        const taskId = task.taskid;

        // 2. Start scan
        await axios.post(`${SQLMAP_API_URL}/scan/${taskId}/start`, { url });

        // 3. Poll scan status until it's complete
        let status = "";
        while (status !== "terminated") {
            const { data: scanStatus } = await axios.get(`${SQLMAP_API_URL}/scan/${taskId}/status`);
            status = scanStatus.status;
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait before checking again
        }
        
        // 4. Get results
        const { data: results } = await axios.get(`${SQLMAP_API_URL}/scan/${taskId}/data`);

        // 5. Extract vulnerabilities
        if (results.success && results.data.length > 0) {
            let vulnerabilities = [];

            results.data.forEach((vuln) => {
                if (vuln.value && Array.isArray(vuln.value)) {
                    vuln.value.forEach((entry) => {
                        if (entry.parameter && entry.data) {
                            Object.values(entry.data).forEach((payload) => {
                                vulnerabilities.push({
                                    parameter: entry.parameter,
                                    attackVector: payload.title,
                                    payload: payload.payload,
                                    dbms: entry.dbms || "Unknown DBMS",
                                });
                            });
                        }
                    });
                }
            });

            return { vulnerable: true, details: vulnerabilities };
        } else {
            return { vulnerable: false, details: [] };
        }
    } catch (error) {
        console.error("sqlmap API error:", error);
        throw error;
    }
}

module.exports = { scanUrl };
