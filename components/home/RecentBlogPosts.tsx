import useTranslation from "next-translate/useTranslation";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { classes } from "./RecentBlogPostsStyles";
import { sectionBg } from "../../public/index";

import { DefaultButton } from "../HOCS/DefaultInputs/DefaultButton";
import { memo, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";

const dummy = [
  {
    positionName: "lingual Event Support Specialist",
    company: "dsa",
    companyLogo: "no",
    city: "LA",
    workSchedules: "full-time",
    timePublished: new Date().getDate(),
  },
  {
    positionName: "lindsasda dwa dsa dcialist",
    company: "ds222222a",
    companyLogo: "nssssss",
    city: "Ls",
    workSchedules: "full-time",
    timePublished: new Date().getDate(),
  },
  ,
  {
    positionName: "lindsasda dwa dsa dcialist",
    company: "ds222222a",
    companyLogo: "nssssss",
    city: "Ls",
    workSchedules: "full-time",
    timePublished: new Date().getDate(),
  },
];

const MemoizedCard = memo(({ blog }: { blog: any }) => {
  const [hovered, setHovered] = useState(false);
  const memoizedHovered = useMemo(() => hovered, [hovered]);
  const handleHoverIn = () => {
    setHovered(true);
  };

  const handleHoverOut = () => {
    setHovered(false);
  };

  return (
    <Card
      sx={classes.blogItem}
      onMouseEnter={handleHoverIn}
      onMouseLeave={handleHoverOut}
    >
      <Box
        sx={{
          ...classes.itemInnerContainer,
          backgroundImage: `url("${sectionBg.src}")`,
        }}
      >
        {/* shadow box */}
        <Box sx={classes.shadowBox} />

        {/* post tags */}
        <Box sx={classes.postTags}>Marketing</Box>

        {/* post info */}
        <CardActionArea
          sx={{ position: "relative", width: "100%", height: "100%" }}
        >
          <CardContent
            className={`${memoizedHovered ? "slideUp" : ""}`}
            sx={{
              transition: "all .5s",
              transform: "translate(0, 45%)",
            }}
          >
            <CardHeader
              title={blog?.positionName}
              subheader="September 14, 2016"
              sx={{
                padding: "0",
                margin: "0 0 14px",
              }}
              titleTypographyProps={{
                color: "common.white",
                fontSize: "24px",
              }}
              subheaderTypographyProps={{
                color: "common.white",
                fontSize: "14px",
                margin: "7px 0",
              }}
            />

            <Typography
              variant="body2"
              className={`${memoizedHovered ? "showUp" : ""}`}
              sx={classes.para}
            >
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </Box>
    </Card>
  );
});

export const RecentBlogPosts: React.FC = () => {
  const router = useRouter();
  const commonTrans = useTranslation("common");
  const homeTrans = useTranslation("home");
  const containerRef = useRef(null);

  const handleClick = (e: any) => {
    e.preventDefault();

    router.push("/blog");
  };

  return (
    <Grid container columns={1} direction={"column"} sx={classes.root}>
      <Grid item container sx={classes.top}>
        <Paper elevation={0} sx={classes.header}>
          {homeTrans.t(`fromTheBlog.header`)}
        </Paper>

        <DefaultButton
          propStyles={{
            width: "auto",
            textTransform: "capitalize",
          }}
          text={`${commonTrans.t("buttons.viewBlog")}`}
          handleClick={handleClick}
          after={
            <ArrowRightAltIcon
              sx={{
                margin: "0 0 0 5px",
              }}
            />
          }
          inputName={"toBlog"}
        />
      </Grid>

      {/* blog container */}
      <Grid container item sx={classes.blogContainer}>
        {dummy.map((blog, index) => {
          return (
            <MemoizedCard blog={blog} key={`${blog?.positionName}_${index}`} />
          );
        })}
      </Grid>
    </Grid>
  );
};
