import Link from "next/link";
import React, { memo } from "react";
import { useRouter } from "next/router";

import { MenuItem, Select, SelectChangeEvent } from "@mui/material/";

import { flagImages } from "../../public/index";

export const Languages: React.FC<{ stickedOrNotHome: boolean }> = memo(
  ({ stickedOrNotHome }) => {
    const { locale, locales } = useRouter();
    const [currentLanguage, setCurrentLanguage] = React.useState("en");

    const handleChange = (event: SelectChangeEvent) => {
      setCurrentLanguage(event.target.value as string);
    };

    return (
      <>
        <Select
          labelId="languages"
          id="languages-select"
          value={currentLanguage}
          label="languages"
          onChange={handleChange}
          variant="standard"
          disableUnderline
          sx={{
            color: stickedOrNotHome ? "primary.contrastText" : "primary.main",
          }}
        >
          {locales?.map((i: string, indx: number) => (
            <MenuItem
              value={i}
              key={`${i}_${indx}`}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "primary.contrastText",
              }}
            >
              <Link href={"/"} locale={i}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={flagImages[indx].src}
                    width={30}
                    height={30}
                    alt={i}
                    style={{ borderRadius: "50%", margin: "0 5px" }}
                  />
                  {i}
                </div>
              </Link>
            </MenuItem>
          ))}
        </Select>
      </>
    );
  }
);
