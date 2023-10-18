import { memo } from "react";
import { IDefaultButton } from "../../../interfaces/inputs";

import { IconButton } from "@mui/material";

const DefaultStyle = {
  bgcolor: "background.main",
  width: "180px",
  height: "37px",
  borderRadius: "50px",
  color: "primary.main",
  fontSize: "16px",
  lineHeight: "52px",
  textTransform: "capitalize",
  transition: "all .3s",
  "&:hover": {
    color: "secondary.main",
    bgcolor: "background.default",
  },
};

const MyButton: React.FC<IDefaultButton> = ({
  text,
  propStyles,
  propClassNames,
  handleClick,
  before,
  inputName,
  after,
}) => {
  return (
    <IconButton
      type="button"
      name={`${inputName}`}
      value={`${text}`}
      className={propClassNames}
      sx={{ ...DefaultStyle, ...propStyles }}
      aria-label="search"
      disableRipple
      onClick={handleClick}
    >
      {before}
      {text}
      {after}
    </IconButton>
  );
};

const DefaultButton = memo(MyButton);

export { DefaultButton };
