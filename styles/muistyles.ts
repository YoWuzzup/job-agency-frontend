// just for reference NONEED
import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { red, orange, grey } from "@mui/material/colors";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...red,
      ...(mode === "dark" && {
        main: red[300],
      }),
    },
    ...(mode === "dark" && {
      background: {
        default: orange[900],
        paper: orange[900],
      },
    }),
    text: {
      ...(mode === "light"
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: "#fff",
            secondary: grey[500],
          }),
    },
  },
});

// Create a theme instance.
export const theme = createTheme(getDesignTokens("light"));
export const lightTheme = createTheme(getDesignTokens("light"));
export const darkTheme = createTheme(getDesignTokens("dark"));
