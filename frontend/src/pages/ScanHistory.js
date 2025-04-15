import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";

const ScanHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/history");
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom style={{ color: "#6a0dad" }}>
        Scan History
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : history.length === 0 ? (
        <Typography variant="h6" align="center">No scan history found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#6a0dad" }}>
              <TableRow>
                <TableCell style={{ color: "white" }}>Date</TableCell>
                <TableCell style={{ color: "white" }}>URL</TableCell>
                <TableCell style={{ color: "white" }}>Status</TableCell>
                <TableCell style={{ color: "white" }}>Payloads</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((scan, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(scan.scannedAt).toLocaleString()}</TableCell>
                  <TableCell>{scan.url}</TableCell>
                  <TableCell style={{ color: scan.vulnerable ? "red" : "green" }}>
                    {scan.vulnerable ? "Vulnerable" : "Not Vulnerable"}
                  </TableCell>
                  <TableCell>
                    {scan.payloads.length > 0 ? (
                      <ul style={{ paddingLeft: "20px" }}>
                        {scan.payloads.map((p, i) => (
                          <li key={i}>
                            <strong>{p.parameter}</strong> - {p.payload} ({p.dbms})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ScanHistory;
