import React, { memo } from "react";

import { Box, Typography, FormGroup } from "@mui/material";

import { IDefaultGroupedSwitch } from "../../../interfaces/inputs";

import { classes } from "./DefaultInputsStyles";
import { DefaultSwitch } from "../..";

const MyGroupedSwitch: React.FC<IDefaultGroupedSwitch> = ({
  header,
  propStyles,
  propHandleChange,
  headerPropStyles,
  switches,
}) => {
  return (
    <Box sx={{ ...classes.common.box, ...propStyles }}>
      <Typography
        variant="h6"
        sx={{ ...classes.common.header, ...headerPropStyles }}
      >
        {header}
      </Typography>
      <FormGroup>
        {switches.map((s, idx) => {
          return (
            <DefaultSwitch
              key={`${s}_${idx}`}
              checked={s.value}
              propName={`${s.name}`}
              label={`${s.label}`}
              propHandleChange={propHandleChange}
            />
          );
        })}
      </FormGroup>
    </Box>
  );
};

const DefaultGroupedSwitch = memo(MyGroupedSwitch);

export { DefaultGroupedSwitch };
