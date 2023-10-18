import { useRouter } from "next/router";
import { useState } from "react";

import { ISingleJob } from "../../interfaces/common";

import { Avatar, Box, Grid, Paper, Skeleton } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const classes = {
  item: {
    width: "100%",
    height: "100%",
    margin: "0 0 20px",
    borderLeft: "3px solid",
    borderColor: "background.default",
    transition: "all .3s",
    cursor: "pointer",
    "&:hover": {
      borderLeft: "3px solid",
      borderColor: "background.main",
      "& .recentjobs_btn": {
        bgcolor: "secondary.main",
        color: "primary.main",
      },
    },
  },
  itemContent: {
    width: "100%",
    height: "100%",
    padding: { xs: "35px 5px", md: "35px 30px" },
    display: "flex",
    flexFlow: { xs: "column", md: "row nowrap" },
    justifyContent: "space-between",
    bgcolor: "background.default",
    alignItems: "center",
  },
  info: {
    display: "flex",
    flexFlow: "row nowrap",
    flexGrow: 1,
    alignSelf: "flex-start",
    margin: "0 20px 0 0",
    flexBasis: "60%",
  },
  logo: {
    display: { xs: "none", md: "block" },
    width: "50px",
    height: "50px",
  },
  innerInfoBlock: {
    display: "flex",
    flexFlow: { xs: "column", md: "row wrap" },
    flexBasis: "100%",
    alignContent: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: "0 0 0 30px",
  },
  positionName: {
    flexBasis: "100%",
    fontSize: 18,
    color: "text.primary",
    display: "flex",
    alignItems: "center",
    marginBottom: "3px",
  },
  companyName: {
    margin: "0 15px 0 0",
    color: "text.secondary",
    display: "flex",
    alignItems: "center",
  },
  cityName: {
    margin: "0 15px 0 0",
    color: "text.secondary",
    display: "flex",
    alignItems: "center",
  },
  schedule: {
    margin: "0 15px 0 0",
    color: "text.secondary",
    display: "flex",
    alignItems: "center",
  },
  publishTime: {
    margin: "0 15px 0 0",
    color: "text.secondary",
    display: "flex",
    alignItems: "center",
  },
  icons: {
    color: "inherit",
    fontSize: "17px",
    margin: "0 5px 0 0",
  },
};

const findDataFuncAttribute = (
  element: HTMLElement | null
): HTMLElement | null => {
  if (element?.getAttribute && element?.getAttribute("data-func") === "true") {
    return element;
  }

  if (element?.parentElement) {
    return findDataFuncAttribute(element?.parentElement);
  }

  return null;
};

export const SingleJob: React.FC<ISingleJob> = ({
  job,
  translation,
  propStyles,
  after,
  handleClickForAfter,
}) => {
  const router = useRouter();
  const [imgError, setImgError] = useState<HTMLImageElement | null>(null);
  const currentTime: number = new Date().getTime();
  const postedTime = new Date(job.posted).getTime();
  const timeDifference = currentTime - postedTime;

  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const daysAgo = Math.floor(timeDifference / oneDayInMilliseconds);

  const handleImageLoading = (e: any) => setImgError(e);

  // IMPORTANT! here I need to pass data-func={true} attribute to {after}
  // so the handleClickForAfter func is executed
  const handleClick = (e: any) => {
    e.preventDefault();

    const elementWithFunc = findDataFuncAttribute(e.target);

    if (elementWithFunc && typeof handleClickForAfter === "function") {
      // Handle element with data-func attribute
      handleClickForAfter(e);
    } else {
      // Handle the case where no element with data-func attribute was found
      router.push(`jobs/${job._id}`);
    }
  };

  return (
    <Grid
      item
      container
      sx={{ ...classes.item, ...propStyles }}
      onClick={(e) => handleClick(e)}
    >
      <Paper elevation={4} sx={classes.itemContent}>
        <Box sx={classes.info}>
          {/* company logo */}
          <Box sx={classes.logo}>
            {job?.avatar && !imgError ? (
              <Avatar
                onError={handleImageLoading}
                src={job?.avatar}
                alt={job?.company}
                sx={{
                  width: "inherit",
                  height: "inherit",
                }}
              />
            ) : (
              <Skeleton variant="circular" width={"100%"} height={"100%"} />
            )}
          </Box>

          {/* position info block */}
          <Box sx={classes.innerInfoBlock}>
            <Box sx={classes.positionName}>{job?.position}</Box>

            {/* company name */}
            {job?.company && (
              <Box sx={classes.companyName}>
                <BusinessIcon sx={classes.icons} />
                {job?.company}
              </Box>
            )}

            {/* city name */}
            {job?.city && (
              <Box sx={classes.cityName}>
                <LocationOnOutlinedIcon sx={classes.icons} />
                {job?.city}
              </Box>
            )}

            {/* work schedules  */}
            {job?.job_type && (
              <Box sx={classes.schedule}>
                <BusinessCenterOutlinedIcon sx={classes.icons} />
                {job?.job_type.map((i, inx) => {
                  return <Box key={`${i}_${inx}`}>{i}</Box>;
                })}
              </Box>
            )}

            {/* time published  */}
            {job?.posted && (
              <Box sx={classes.publishTime}>
                <AccessTimeOutlinedIcon sx={classes.icons} />
                {daysAgo === 0
                  ? "today"
                  : daysAgo === 1
                  ? "yesterday"
                  : `${daysAgo} days ago`}
              </Box>
            )}
          </Box>
        </Box>

        {after}
      </Paper>
    </Grid>
  );
};
