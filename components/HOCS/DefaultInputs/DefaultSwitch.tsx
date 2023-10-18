import React, { memo } from "react";

import {
  FormControlLabel,
  Typography,
  Switch,
  SwitchProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { IDefaultSwitch } from "../../../interfaces/inputs";

const StyledSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 34,
  height: 20,
  padding: 0,
  margin: "0 10px 0 0",
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(14px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "light" ? "#00e2bd" : "#ce93d8",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 16,
    height: 16,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#CCC",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const MySwitch: React.FC<IDefaultSwitch> = ({
  label,
  propName,
  checked,
  propStyles,
  propHandleChange,
  labelPropStyles,
}) => {
  return (
    <FormControlLabel
      control={
        <StyledSwitch
          checked={checked}
          sx={{ ...propStyles }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            propHandleChange(e)
          }
        />
      }
      name={`${propName}`}
      label={
        <Typography
          sx={{
            ...labelPropStyles,
            fontSize: "16px",
            color: "primary.contrastText",
          }}
        >{`${label}`}</Typography>
      }
      labelPlacement="end"
      sx={{
        margin: "0 0 10px",
      }}
    />
  );
};

const DefaultSwitch = memo(MySwitch);

export { DefaultSwitch };
