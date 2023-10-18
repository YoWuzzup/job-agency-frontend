import React, { memo } from "react";

import { Box, InputAdornment, InputBase, Typography } from "@mui/material";

import { IDefaultInput } from "../../../interfaces/inputs";
import { classes } from "./DefaultInputsStyles";

const MyInput: React.FC<IDefaultInput> = ({
  plholder,
  propStyles,
  headerPropStyles,
  inputPropStyles,
  propClassNames,
  handleChange,
  inputName,
  ariaLabel,
  propValue,
  header,
  before,
  after,
}) => {
  return (
    <Box
      component="form"
      sx={{ ...classes.common.box, ...propStyles }}
      className={`${propClassNames}`}
      noValidate
      autoComplete="off"
    >
      {header && (
        <Typography
          variant="h6"
          sx={{ ...classes.common.header, ...headerPropStyles }}
        >
          {header}
        </Typography>
      )}
      <InputBase
        sx={{ ...classes.defaultInput.input, ...inputPropStyles }}
        onChange={handleChange}
        value={propValue}
        placeholder={`${plholder}`}
        inputProps={{ "aria-label": `${ariaLabel}`, name: `${inputName}` }}
        startAdornment={
          <InputAdornment position="start">{before}</InputAdornment>
        }
        endAdornment={<InputAdornment position="end">{after}</InputAdornment>}
      />
    </Box>
  );
};

const DefaultInput = memo(MyInput);

export { DefaultInput };
