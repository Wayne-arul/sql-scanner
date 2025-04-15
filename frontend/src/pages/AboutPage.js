import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const AboutPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          About SQL Scanner
        </Typography>
        <Typography variant="body1" paragraph>
          SQL Scanner is a powerful web application that helps developers and security professionals identify SQL injection vulnerabilities in their web applications. It uses the popular <strong>sqlmap</strong> API under the hood to detect various types of SQLi vulnerabilities like:
        </Typography>
        <ul>
          <li>Boolean-based SQLi</li>
          <li>Error-based SQLi</li>
          <li>Time-based blind SQLi</li>
          <li>Union-based SQLi</li>
        </ul>
        <Typography variant="body1" paragraph>
          The tool allows users to initiate a scan by entering a URL. If vulnerabilities are found, it displays detailed information including vulnerable parameters, attack vectors, payloads, and the backend DBMS.
        </Typography>
        <Typography variant="body1" paragraph>
          Features include:
        </Typography>
        <ul>
          <li>Real-time scan results</li>
          <li>Scan history tracking</li>
          <li>PDF report generation</li>
          <li>Analytics dashboard</li>
        </ul>
        <Typography variant="body1" paragraph>
          Built using <strong>React</strong>, <strong>Flask</strong>, and <strong>MongoDB</strong>, this tool is ideal for learning, research, and real-world testing of SQL injection vulnerabilities.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutPage;
