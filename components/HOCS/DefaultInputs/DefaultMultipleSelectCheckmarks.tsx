import React, { memo, useState } from "react";

import {
  Box,
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

import { IDefaultMultipleSelectCheckmarks } from "../../../interfaces/inputs";

import { classes } from "./DefaultInputsStyles";
import useTranslation from "next-translate/useTranslation";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 10;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 232,
    },
  },
};

function getMultipleSelectStyles(
  cat: string,
  selected: readonly string[] | string
) {
  return {
    transition: "all ease .3s",
    height: "35px",
    color: "#808080",
    bgcolor: "rgba(42,65,232,.07)",
    margin: "0 10px",
    padding: "7px 10px",
    // just for reference
    // fontWeight:
    //   selected.indexOf(cat) === -1
    //     ? "typography.fontWeightRegular"
    //     : "typography.fontWeightMedium",
  };
}

const MyMultipleSelectCheckmarks: React.FC<
  IDefaultMultipleSelectCheckmarks
> = ({
  plholder,
  header,
  propStyles,
  headerPropStyles,
  iconIfChecked,
  iconIfUnchecked,
  dataToMap,
  propHandleChange,
  selected,
}) => {
  const { t } = useTranslation("common");

  return (
    <Box sx={{ ...classes.common.box, ...propStyles }}>
      {header && (
        <Typography
          variant="h6"
          sx={{ ...classes.common.header, ...headerPropStyles }}
        >
          {header}
        </Typography>
      )}
      <FormControl
        sx={{
          width: "100%",
          borderRadius: "4px",
        }}
      >
        <Select
          id="multiple-checkbox"
          multiple
          displayEmpty
          value={selected}
          onChange={propHandleChange}
          input={<OutlinedInput label="Tag" />}
          inputProps={{
            "aria-label": "Without label",
          }}
          name="sort"
          MenuProps={MenuProps}
          sx={{
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": {
              border: "none",
              outline: "none",
            },
            ...propStyles,
          }}
          renderValue={(s) => {
            if (selected.length === 1) {
              return (
                <Box
                  sx={{
                    color: "#808080",
                    fontStyle: "normal",
                    fontSize: "16px",
                  }}
                >
                  {selected}
                </Box>
              );
            } else if (selected.length === 2) {
              return plholder;
            }

            return `${
              s.length - 1 < 0
                ? `${t("sorting.topPannel.default")}`
                : `${s.length - 1} ${t("sorting.topPannel.itemsSelected")}`
            }`;
          }}
        >
          {dataToMap.map((d: { label: string; value: string }) => (
            <MenuItem
              key={d.value}
              value={d.value}
              style={{
                ...getMultipleSelectStyles(d.value, selected),
                textTransform: "capitalize",
              }}
            >
              <ListItemText
                // the content and font size of category items
                primary={d.label}
                primaryTypographyProps={{
                  fontSize: "16px",
                  sx: {
                    "&:hover": {
                      transition: "all ease .3s",
                      color: "secondary.main",
                    },
                  },
                }}
              />
              <Checkbox
                disableRipple
                // icon if checked
                checkedIcon={
                  iconIfChecked || (
                    <CheckOutlinedIcon
                      color="secondary"
                      sx={{
                        transition: "all ease .5s",
                        fontSize: "24px",
                        m: "0 5px 0",
                      }}
                    />
                  )
                }
                // icon if unchecked
                icon={
                  iconIfUnchecked || (
                    <CheckOutlinedIcon
                      sx={{
                        color: "rgba(42,65,232,.0)",
                      }}
                      fontSize="medium"
                    />
                  )
                }
                checked={selected.indexOf(d.value) > -1}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

const DefaultMultipleSelectCheckmarks = memo(MyMultipleSelectCheckmarks);

export { DefaultMultipleSelectCheckmarks };
