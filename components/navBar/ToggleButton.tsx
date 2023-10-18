import { memo, useCallback, useContext } from "react";
import ColorModeContext from "../../styles/ColorModeContext";
import { useTheme } from "@mui/material/styles";

import { Tooltip, Box, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export const ToggleButton: React.FC = memo(() => {
  const theme = useTheme();
  const { darkMode, setDarkMode } = useContext(ColorModeContext);

  const handleClick = useCallback(() => {
    setDarkMode((prevDarkMode: boolean) => !prevDarkMode);
  }, [setDarkMode]);

  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: "50%",
      }}
    >
      <Tooltip
        title={`${
          theme.palette.mode.charAt(0).toUpperCase() +
          theme.palette.mode.slice(1)
        } mode`}
      >
        <IconButton onClick={handleClick} color="inherit">
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon color="secondary" />
          ) : (
            <Brightness4Icon color="secondary" />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
});
