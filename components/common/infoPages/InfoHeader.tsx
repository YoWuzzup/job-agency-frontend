import { Avatar, Grid, Rating, Skeleton } from "@mui/material";
import { IInfoHeader } from "../../../interfaces/common";

import BusinessIcon from "@mui/icons-material/Business";
import useTranslation from "next-translate/useTranslation";

const classes = {
  root: {
    width: "100%",
    margin: "82px 0 0",
    padding: { xs: "35px 0 35px", md: "55px 0" },
    justifyContent: "center",
    alignItems: "center",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
    backgroundSize: "cover",
  },
  imageCompany: {
    width: { xs: "80px", md: "140px" },
    height: { xs: "70px", md: "140px" },
    margin: { xs: "0 0 30px", md: "0" },
    boxShadow: "0 3px 8px rgb(0 0 0 / 8%)",
    borderRadius: "50%",
  },
  imageFreelancer: {
    width: { xs: "80px", md: "140px" },
    height: { xs: "70px", md: "140px" },
    margin: { xs: "0 0 30px", md: "0" },
    bgcolor: "black",
    boxShadow: "0 3px 8px rgb(0 0 0 / 8%)",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flexFlow: { xs: "column", sm: "row wrap" },
    flexBasis: { xs: "auto", sm: "50%" },
    margin: { xs: "0", md: "0 35px 0" },
    alignItems: { xs: "flex-start", md: "center" },
  },
  name: {
    fontSize: { xs: "24px", md: "26px" },
    color: "primary.dark",
    textTransform: "capitalize",
    margin: { xs: "0 0 25px", md: "0" },
    padding: "0 0 12px",
    flexBasis: "100%",
    borderBottom: { xs: "1px solid #e0e0e0", md: "none" },
  },
  aboutCompany: {
    margin: "0 0 12px",
    flexBasis: "100%",
    fontSize: "16px",
    color: "primary.dark",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  aboutFreelancer: {
    margin: "0 0 20px",
    flexBasis: "100%",
    fontSize: "20px",
    color: "primary.dark",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  companyName: {
    margin: { xs: "0 10px 12px 0", md: "0 20px 0 0" },
    fontSize: "16px",
    color: "primary.contrastText",
    textTransform: "capitalize",
    alignItems: "center",
    width: "auto",
    transition: "all ease .3s",
    "&:hover": {
      color: "secondary.main",
      cursor: "pointer",
    },
  },
  ratingContainer: {
    width: "auto",
    alignItems: "center",
    flexFlow: "row nowrap",
    margin: { xs: "0 10px 12px 0", md: "0 20px 0 0" },
  },
  ratingNumber: {
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
    margin: "0 10px 0 0",
  },
  country: {
    margin: "0 20px 0 0",
    fontSize: "16px",
    color: "primary.contrastText",
    textTransform: "capitalize",
  },
};

export const InfoHeader: React.FC<IInfoHeader> = ({
  bgImage,
  after,
  type,
  info,
}) => {
  const { t } = useTranslation("common");
  const countedRating = () => {
    let counting = info?.feedbacks?.reduce(
      (count: number, obj: any) => (obj?.rating ? count + obj?.rating : count),
      0
    );

    return Math.round((counting / info?.feedbacks?.length) * 2) / 2;
  };

  return (
    <Grid
      container
      sx={{
        ...classes.root,
        backgroundImage: {
          xs: "unset",
          md: `linear-gradient(to left, transparent -20%, #f4f4f4 50%), url(${bgImage.src})`,
        },
        backgroundColor: { xs: "#f7f7f7", md: "unset" },
      }}
    >
      {/* header */}
      <Grid
        item
        container
        sx={{
          width: { xs: "90%", sm: "80%", md: "90%", lg: "75%" },
          flexFlow: { xs: "row wrap", md: "row nowrap" },
          alignItems: "center",
        }}
      >
        {/* job header info */}
        <Grid
          item
          container
          sx={{
            flexFlow: { xs: "column", md: "row nowrap" },
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Grid
            item
            sx={
              type === "company"
                ? classes.imageCompany
                : classes.imageFreelancer
            }
          >
            {info?.avatar ? (
              <Avatar
                src={info?.avatar}
                alt={info?.fullName}
                sx={{
                  width: "inherit",
                  height: "inherit",
                }}
              />
            ) : (
              <Skeleton variant="circular" width={"100%"} height={"100%"} />
            )}
          </Grid>

          <Grid item container sx={classes.infoContainer}>
            <Grid item sx={classes.name}>
              {type === "company"
                ? info?.currentPosition?.position
                : info?.fullName}
            </Grid>

            <Grid
              item
              sx={
                type === "company"
                  ? classes.aboutCompany
                  : classes.aboutFreelancer
              }
            >
              {type === "company"
                ? `${t("jobId.subHeader")}`
                : info?.currentPosition?.position}
            </Grid>

            {type === "company" && (
              <Grid item container sx={classes.companyName}>
                <BusinessIcon sx={{ margin: "0 10px 0 0" }} />
                {info?.fullName}
              </Grid>
            )}

            <Grid item container sx={classes.ratingContainer}>
              <Grid sx={classes.ratingNumber}>{`${countedRating()}`}</Grid>
              <Rating
                name="freelancer-rating-readonly"
                value={countedRating()}
                precision={0.5}
                readOnly
              />
            </Grid>
            <Grid item sx={classes.country}>
              {info?.country}
            </Grid>
          </Grid>
        </Grid>

        {/* header salary */}
        {after}
      </Grid>
    </Grid>
  );
};
