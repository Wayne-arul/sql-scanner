// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6A1B9A', // Purple
    },
    secondary: {
      main: '#4A148C', // Dark Purple
    },
    background: {
      default: '#F3F3F3', // Light Gray
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
