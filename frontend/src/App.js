// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ScanHistory from './pages/ScanHistory';
import AIReport from './pages/AIReport';
import Alerts from './pages/Alerts';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import AboutPage from './pages/AboutPage';



// Inside Routes:


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ai-report" element={<AIReport />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/scan-history" element={<ScanHistory />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
