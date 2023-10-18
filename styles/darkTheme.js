import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      contrastText: "rgb(124, 124, 124)",
      dark: "rgb(124, 124, 124)",
      main: "#000",
      light: "rgb(255 255 255 / 60%)",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#121212",
      paper: "#070919",
      main: "#ce93d8",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#94a3b8",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: [
      "Lato",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    body1: {
      fontSize: "1.125rem",
    },
  },
});

export default theme;
