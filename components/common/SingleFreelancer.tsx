import { ISingleFreelancer } from "../../interfaces/common";

import { Avatar, Box, Grid, Rating, Skeleton } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import { DefaultButton } from "../index";

const classes = {
  item: {
    width: "100%",
    margin: "0 0 30px",
    padding: { xs: "0 30px", lg: "35px 30px" },
    transition: "all .3s",
    borderRadius: "4px",
    boxShadow: "0 2px 12px rgb(0 0 0 / 12%)",
    justifyContent: "space-between",
    alignItems: "center",
    flexFlow: { xs: "column", lg: "row nowrap" },
    "&:hover": {
      transform: "translateY(-5%)",
    },
  },
  avatarBlock: {
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "5%",
    flexFlow: { xs: "column", md: "row nowrap" },
  },
  avatar: {
    width: "100px",
    height: "100px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50px",
    transform: { xs: "translateY(-15%)", lg: "translateY(-50%)" },
  },
  name: {
    fontSize: "18px",
    color: "primary.contrastText",
    fontWeight: "bold",
    textTransform: "capitalize",
    cursor: "pointer",
  },
  position: { fontSize: "16px", color: "primary.light", margin: "0 0 5px" },
  starRating: {
    color: "primary.main",
    bgcolor: "#febe42",
    fontSize: "14px",
    fontWeight: "bold",
    width: "34px",
    height: "25px",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    margin: { xs: "30px 0 0", lg: "0" },
    display: "flex",
    flexFlow: { xs: "column", md: "row wrap" },
    justifyContent: { xs: "flex-start", lg: "flex-end" },
  },
};

export const SingleFreelancer: React.FC<ISingleFreelancer> = ({
  freelancer,
  propStyles,
  handleClick,
  after,
}) => {
  const sumOfStars = freelancer?.starRating?.reduce(
    (acc: number, current: number) => acc + current,
    0
  );
  const avarageStarRating = sumOfStars / freelancer?.starRating?.length;
  const countJobPercentage = (jobs: any) => {
    let count = 0;
    for (const job of jobs) {
      if (job.success) {
        count++;
      }
    }
    const percentage = (count / jobs.length) * 100;
    return percentage;
  };

  return (
    <Grid item container sx={{ ...classes.item, ...propStyles }}>
      {/* avatar and basic info */}
      <Grid item container sx={classes.avatarBlock}>
        <Box sx={classes.avatar} onClick={handleClick}>
          {freelancer?.avatar ? (
            <Avatar
              src={freelancer?.avatar}
              alt={freelancer?.name}
              sx={{
                width: "inherit",
                height: "inherit",
              }}
            />
          ) : (
            <Skeleton variant="circular" width={"100%"} height={"100%"} />
          )}
        </Box>

        <Grid item sx={{ flexFlow: "column" }}>
          <Box sx={classes.name} onClick={handleClick}>
            {freelancer?.name || "Noname"}
          </Box>
          <Box sx={classes.position}>
            {freelancer?.current_position?.position}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexFlow: "row nowrap",
            }}
          >
            {freelancer?.starRating?.length < 3 || !freelancer?.starRating ? (
              <Box
                sx={{
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#f0f0f0",
                  color: "#888",
                  fontSize: "14px",
                  padding: "7px 9px",
                }}
              >
                Minimum of 3 votes required
              </Box>
            ) : (
              <>
                <Box sx={classes.starRating}>
                  {avarageStarRating.toFixed(1)}
                </Box>
                <Rating
                  name="freelancer-rating-readonly"
                  value={avarageStarRating}
                  precision={0.5}
                  readOnly
                />
              </>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* job info and link button */}
      <Grid item container sx={classes.info}>
        <Box
          sx={{ fontSize: "14.7px", color: "primary.light", flexBasis: "30%" }}
        >
          Job Success
          <Box sx={{ fontWeight: "bold", color: "primary.dark" }}>
            {freelancer?.jobs_done?.length > 0
              ? countJobPercentage(freelancer?.jobs_done)
              : "none"}{" "}
            %
          </Box>
        </Box>
        <Box
          sx={{
            fontSize: "14.7px",
            color: "primary.light",
            flexBasis: "30%",
          }}
        >
          Rate{" "}
          <Box sx={{ fontWeight: "bold", color: "primary.dark" }}>
            {freelancer?.rate ? `$${freelancer?.rate} / hr` : "ask"}
          </Box>
        </Box>
        <Box
          sx={{ fontSize: "14.7px", color: "primary.light", flexBasis: "30%" }}
        >
          Location{" "}
          <Box
            sx={{
              fontWeight: "bold",
              color: "primary.dark",
              display: "flex",
              alignItems: "center",
              flexFlow: "row nowrap",
            }}
          >
            <LocationOnOutlinedIcon
              sx={{ fontSize: "14.7px", margin: "0 5px 0 0" }}
            />{" "}
            {freelancer?.city}
          </Box>
        </Box>

        <DefaultButton
          handleClick={handleClick}
          text={"View Profile"}
          propStyles={{
            width: { xs: "100%", lg: "160px" },
            margin: { xs: "30px 0", lg: "20px 0" },
            transition: "all ease .3s",
            "&:hover": {
              "& .arrowIcon": {
                width: "22px",
              },
            },
          }}
          after={
            <ArrowRightAltIcon
              className="arrowIcon"
              sx={{
                margin: "0 0 0 5px",
                transition: "all ease .3s",
                color: "primary.main",
                width: "0",
              }}
            />
          }
          inputName={""}
        />
      </Grid>
    </Grid>
  );
};
