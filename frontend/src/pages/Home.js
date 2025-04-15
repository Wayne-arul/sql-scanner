import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Home = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post('http://localhost:5000/scan', { url });
      setResult(response.data);
    } catch (err) {
      setResult({ message: 'Scan failed. Please try again later.' });
    }

    setLoading(false);
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('SQL Injection Scan Report', 14, 22);
    doc.setFontSize(12);
    doc.text(`Scanned URL: ${url}`, 14, 32);
  
    if (result?.details?.length > 0) {
      const tableColumn = ['Parameter', 'Attack Vector', 'Payload', 'DBMS'];
      const tableRows = result.details.map(item => [
        item.parameter,
        item.attackVector,
        item.payload,
        item.dbms
      ]);
  
      autoTable(doc, {
        startY: 40,
        head: [tableColumn],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [106, 13, 173] },
      });
    } else {
      doc.text('No vulnerabilities found.', 14, 40);
    }
  
    doc.save('scan_report.pdf');
  };
  

  return (
    <Container maxWidth="md">
      <Box mt={4}>
              <Typography variant="h3" gutterBottom color="primary">SQL Scanner</Typography>
              <Typography variant="h6">Welcome to the SQL Scanner! Navigate to the dashboard to start a scan.</Typography>
      </Box>
      <Box mt={10} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Enter a URL to scan:
        </Typography>
        <TextField
          label="Target URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleScan}>
          Start Scan
        </Button>

        <Box mt={4}>
          {loading && <CircularProgress />}
          {result && (
            <Box
              mt={3}
              p={3}
              borderRadius={2}
              bgcolor={result.vulnerable ? '#ffcccc' : '#ccffcc'}
            >
              <Typography variant="h6">
                {result.vulnerable
                  ? 'VULNERABLE! SQL Injection Detected'
                  : 'Not Vulnerable! No SQL Injection Found'}
              </Typography>

              {result.vulnerable && result.details?.length > 0 && (
                <>
                  <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                    <Table>
                      <TableHead>
                        <TableRow style={{ backgroundColor: '#6a0dad' }}>
                          <TableCell style={{ color: 'white' }}>Parameter</TableCell>
                          <TableCell style={{ color: 'white' }}>Attack Vector</TableCell>
                          <TableCell style={{ color: 'white' }}>Payload</TableCell>
                          <TableCell style={{ color: 'white' }}>DBMS</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {result.details.map((item, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{item.parameter}</TableCell>
                            <TableCell>{item.attackVector}</TableCell>
                            <TableCell>{item.payload}</TableCell>
                            <TableCell>{item.dbms}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box mt={3}>
                    <Button variant="outlined" color="secondary" onClick={generatePDFReport}>
                      Generate Report
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
