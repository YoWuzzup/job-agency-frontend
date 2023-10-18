import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// main white primary.main
// main colorfull secondary.main
// 666666s primary.contrastText
// 777777s primary.light
// 333333s primary.dark

// background white background.default
// background a little greyer background.paper
// background colorful background.main

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      contrastText: "#666666",
      dark: "#333",
      light: "#777",
      main: "#ffffff",
    },
    secondary: {
      main: "#00e2bd",
      text: "#C0C0C0",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
      paper: "#f0f0f0",
      main: "#00e2bd",
    },
    text: {
      primary: "#333333",
      secondary: "#777777",
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: [
      "Nunito Sans",
      "Ubuntu",
      "Cantarell",
      "Noto Sans",
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
    fontWeightLight: 300,
    fontWeightBold: 600,
    body1: {
      fontSize: "1.125rem",
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export default theme;
