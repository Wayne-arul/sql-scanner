const axios = require("axios");

const BASE_URL = "http://127.0.0.1:7000";

async function createTask() {
  const response = await axios.get(`${BASE_URL}/task/new`);
  if (response.data.success) {
    return response.data.taskid;
  }
  throw new Error("Failed to create task");
}

async function startScan(taskid, url) {
  const response = await axios.post(`${BASE_URL}/scan/${taskid}/start`, { url });
  if (!response.data.success) {
    throw new Error("Failed to start scan");
  }
}

async function checkScanStatus(taskid) {
  const response = await axios.get(`${BASE_URL}/scan/${taskid}/status`);
  if (!response.data.success) {
    throw new Error("Failed to check scan status");
  }
  return response.data.status;
}

async function getScanData(taskid) {
  const response = await axios.get(`${BASE_URL}/scan/${taskid}/data`);
  if (!response.data.success) {
    throw new Error("Failed to get scan data");
  }
  return response.data.data;
}

module.exports = {
  createTask,
  startScan,
  checkScanStatus,
  getScanData,
};
