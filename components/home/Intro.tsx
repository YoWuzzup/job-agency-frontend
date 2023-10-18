import React, { memo, useState, useMemo, useCallback } from "react";
import useTranslation from "next-translate/useTranslation";
import {
  Divider,
  Paper,
  InputBase,
  Box,
  Typography,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import { classes } from "./IntroStyles";
import { homePoster } from "../../public/index";
import { DefaultButton } from "../index";
import { useAppDispatch, useAppSelector, useScreenSize } from "../../hooks";
import { changeSearchingFilter } from "../../redux/actions/common";
import { useRouter } from "next/router";

const Video: React.FC = memo(() => (
  <video
    autoPlay
    muted
    loop
    poster={`${homePoster.src}`}
    style={{
      objectFit: "cover",
      width: "100%",
      height: "100%",
    }}
  >
    <source src="/home/home-video-background.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
));

const BigScreenSearch: React.FC<any> = memo(
  ({ memoizedClasses, t, handleClick }) => {
    const [searchData, setSearchData] = useState<{
      location?: string;
      keywords?: string;
    }>({});

    const handleSearch = useCallback((e: any) => {
      e.preventDefault();

      setSearchData((prevSearchData) => ({
        ...prevSearchData,
        [e.target.name]: e.target.value,
      }));
    }, []);

    return (
      <Paper component="form" sx={memoizedClasses.paper}>
        <InputBase
          sx={memoizedClasses.inputBase}
          placeholder={`${t("home:intro.inputFields.job")}`}
          inputProps={{ "aria-label": "Online Job", name: "location" }}
          startAdornment={
            <InputAdornment position="start">
              <LocationOnOutlinedIcon sx={{ color: "primary.dark" }} />
            </InputAdornment>
          }
          onChange={handleSearch}
        />

        <Divider sx={{ height: "100%", m: 0.5 }} orientation="vertical" />
        <InputBase
          sx={memoizedClasses.inputBase}
          placeholder={`${t("home:intro.inputFields.keywords")}`}
          inputProps={{
            "aria-label": "Job Title or Keywords",
            name: "keywords",
          }}
          onChange={handleSearch}
        />
        <DefaultButton
          inputName="search_btn"
          text={`${t("common:buttons.search")}`}
          propStyles={memoizedClasses.DefaultButton}
          handleClick={(e) => {
            handleClick(e, searchData);
          }}
        />
      </Paper>
    );
  }
);

const SmallScreenSearch: React.FC<any> = memo(
  ({ memoizedClasses, t, handleClick }) => {
    const [searchData, setSearchData] = useState<{
      location?: string;
      keywords?: string;
    }>({});

    const handleSearch = useCallback((e: any) => {
      e.preventDefault();

      setSearchData((prevSearchData) => ({
        ...prevSearchData,
        [e.target.name]: e.target.value,
      }));
    }, []);

    return (
      <Box component="form" sx={memoizedClasses.smallScreenSearch}>
        <Paper
          sx={{
            width: "100%",
            height: "56px",
            margin: "0 0 88px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InputBase
            sx={memoizedClasses.inputBase}
            placeholder={`${t("home:intro.inputFields.job")}`}
            inputProps={{ "aria-label": "Online Job", name: "location" }}
            startAdornment={
              <InputAdornment position="start">
                <LocationOnOutlinedIcon sx={{ color: "primary.dark" }} />
              </InputAdornment>
            }
            onChange={handleSearch}
          />{" "}
        </Paper>
        <Paper
          sx={{
            width: "100%",
            height: "56px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 0 0 22px",
            margin: "0 0 38px 0",
          }}
        >
          <InputBase
            sx={memoizedClasses.inputBase}
            placeholder={`${t("home:intro.inputFields.keywords")}`}
            inputProps={{
              "aria-label": "Job Title or Keywords",
              name: "keywords",
            }}
            onChange={handleSearch}
          />
        </Paper>
        <DefaultButton
          inputName="search_btn"
          text={`${t("common:buttons.search")}`}
          propStyles={memoizedClasses.DefaultButton}
          handleClick={(e) => {
            handleClick(e, searchData);
          }}
        />
      </Box>
    );
  }
);

export const Intro: React.FC = memo(() => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation("");
  const info = useAppSelector((st) => st.introInfo);
  const memoizedInfo = useMemo(() => info, [info]);
  const memoizedClasses = useMemo(() => classes, []);
  const { width } = useScreenSize();

  const handleClick = (
    e: React.MouseEvent<HTMLElement>,
    data: { location: string; keywords: string }
  ) => {
    e.preventDefault();

    dispatch(changeSearchingFilter(data));
    router.push("/jobs");
  };

  return (
    <Box sx={memoizedClasses.root}>
      {/* Background video */}
      <Video />

      {/* Background shadow box */}
      <Box sx={memoizedClasses.shadow} />

      {/* Main content */}
      <Box sx={memoizedClasses.mainContent}>
        <Typography variant="h3" sx={memoizedClasses.header}>
          {t(`home:intro.mainHeader`)}
        </Typography>
        <Typography sx={memoizedClasses.secondHeader}>
          {t("home:intro.subHeader")}
        </Typography>

        {width > 900 ? (
          <BigScreenSearch
            handleClick={handleClick}
            t={t}
            memoizedClasses={memoizedClasses}
          />
        ) : (
          <SmallScreenSearch
            memoizedClasses={memoizedClasses}
            t={t}
            handleClick={handleClick}
          />
        )}

        <List sx={memoizedClasses.list}>
          <ListItem sx={memoizedClasses.listItem}>
            <ListItemText
              primary={memoizedInfo?.vacanciesLength}
              secondary={`${t("home:intro.statistics.jobs")}`}
              primaryTypographyProps={{
                sx: memoizedClasses.numbers,
              }}
              secondaryTypographyProps={{
                sx: memoizedClasses.numberNames,
              }}
            />
          </ListItem>

          <Divider
            sx={{
              height: "100%",
              m: "0 35px 0",
              bgcolor: "common.white",
              opacity: ".7",
            }}
            orientation="vertical"
          />

          <ListItem sx={memoizedClasses.listItem}>
            <ListItemText
              primary={memoizedInfo?.freelancersLength}
              secondary={`${t("home:intro.statistics.freelancers")}`}
              primaryTypographyProps={{
                sx: memoizedClasses.numbers,
              }}
              secondaryTypographyProps={{
                sx: memoizedClasses.numberNames,
              }}
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
});
