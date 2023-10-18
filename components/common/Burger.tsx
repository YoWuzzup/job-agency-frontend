import { Box, Button } from "@mui/material";

export const Burger: React.FC<{
  open?: boolean;
  setOpen?: (i: boolean) => void;
  propStyles: {};
}> = ({ open, setOpen, propStyles }) => {
  return (
    <Button
      onClick={open ? () => setOpen?.(!open) : () => {}}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "22px",
        minWidth: "auto",
        height: "22px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
        "&:focus": {
          outline: "none",
        },
        ...propStyles,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "0.25rem",
          background: "#EFFFFA",
          borderRadius: "10px",
          transition: "all 0.3s linear",
          position: "relative",
          transformOrigin: "1px",
          transform: open ? "rotate(45deg)" : "rotate(0)",
        }}
      />
      <Box
        sx={{
          width: "100%",
          height: "0.25rem",
          background: "#EFFFFA",
          borderRadius: "10px",
          transition: "all 0.3s linear",
          position: "relative",
          transformOrigin: "1px",
          opacity: open ? "0" : "1",
          transform: open ? "translateX(20px)" : "translateX(0)",
        }}
      />
      <Box
        sx={{
          width: "100%",
          height: "0.25rem",
          background: "#EFFFFA",
          borderRadius: "10px",
          transition: "all 0.3s linear",
          position: "relative",
          transformOrigin: "1px",
          transform: open ? "rotate(-45deg)" : "rotate(0)",
        }}
      />
    </Button>
  );
};
