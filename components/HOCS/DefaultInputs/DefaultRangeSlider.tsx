import React, { memo } from "react";

import { Box, Slider, SliderProps, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { IDefaultRangeSlider } from "../../../interfaces/inputs";

import { classes } from "./DefaultInputsStyles";

const StyledSlider = styled((props: SliderProps) => <Slider {...props} />)(
  ({ theme }) => ({
    color: theme.palette.mode === "light" ? "#00e2bd" : "#ce93d8",
    height: 3,
    width: "90%",
    alignSelf: "center",
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 20,
      width: 20,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 14,
      background: "unset",
      padding: "10px 12px",
      backgroundColor: "#333",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) scale(0)",
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(0, -100%) scale(1)",
      },
    },
    "& .MuiSlider-rail": {
      color: "#666666",
    },
  })
);

function valueText(val: number | number[]) {
  return `${val}`;
}

const MyRangeSlider: React.FC<IDefaultRangeSlider> = ({
  header,
  min,
  max,
  minValue,
  maxValue,
  step,
  valueDisplay,
  propStyles,
  propName,
  propHandleChange,
  headerPropStyles,
  valueShownInHeader,
}) => {
  return (
    <Box sx={{ ...classes.common.box, ...propStyles }}>
      <Typography
        variant="h6"
        sx={{ ...classes.common.header, ...headerPropStyles }}
      >
        {valueShownInHeader
          ? `${header}${valueText(maxValue ? [minValue, maxValue] : minValue)}`
          : header}
      </Typography>
      <StyledSlider
        getAriaLabel={() => `${header}`}
        value={maxValue ? [minValue, maxValue] : minValue}
        name={`${propName}`}
        onChange={propHandleChange}
        valueLabelDisplay={valueDisplay ? "on" : "off"}
        valueLabelFormat={(value, index) => {
          if (index === 0) {
            return `${value}`;
          } else if (index === 1) {
            return `${value}`;
          }
          return "";
        }}
        getAriaValueText={valueText}
        step={step}
        min={min}
        max={max}
      />
    </Box>
  );
};

const DefaultRangeSlider = memo(MyRangeSlider);

export { DefaultRangeSlider };
