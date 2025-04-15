// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/analytics")
      .then((res) => {
        setAnalytics(res.data);
      })
      .catch((err) => {
        console.error("Error fetching analytics:", err);
      });
  }, []);

  if (!analytics) return <Typography>Loading analytics...</Typography>;

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  const scansPerDayData = Object.entries(analytics.scansPerDay).map(([date, count]) => ({
    date,
    count
  }));

  const vulnerabilityData = [
    { name: "Vulnerable", value: analytics.vulnerabilityStats.vulnerable },
    { name: "Not Vulnerable", value: analytics.vulnerabilityStats.notVulnerable },
  ];

  const sqliTypeData = Object.entries(analytics.sqliTypes).map(([type, count]) => ({
    name: type,
    value: count
  }));

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>📊 Dashboard Analytics</Typography>

      {/* Scans per Day */}
      <Box mt={5}>
        <Typography variant="h6">🗓 Scans per Day (Last 7 Days)</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={scansPerDayData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Vulnerability Pie Chart */}
      <Box mt={5}>
        <Typography variant="h6">🛡️ Vulnerability Status</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={vulnerabilityData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {vulnerabilityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* SQLi Type Chart */}
      <Box mt={5}>
        <Typography variant="h6">💥 Types of SQL Injection Detected</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sqliTypeData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#ff5722" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
