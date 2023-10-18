import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  Typography,
  Box,
  Grid,
  Paper,
  Avatar,
  Skeleton,
  Tooltip,
  Rating,
} from "@mui/material/";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FaceOutlined";

import {
  useAppDispatch,
  useAppSelector,
  useLocalStorage,
  useScreenSize,
} from "../../hooks";
import {
  CustomizedBreadcrumbs,
  DashboardDrawer,
  SettingsSubMenu,
} from "../../components";
import { deleteBookmarks, fetchBookmarks } from "../../api/users";
import useTranslation from "next-translate/useTranslation";

const breadcrumbData = [
  {
    linkTo: "/",
    label: "home",
  },
  {
    linkTo: "/dashboard",
    label: "dashboard",
  },
  {
    linkTo: "",
    label: "bookmarks",
    active: true,
  },
];

const bookmarkedJobClasses = {
  item: {
    width: "100%",
    height: "100%",
    margin: "0",
    borderColor: "background.default",
    transition: "all .3s",
  },
  itemContent: {
    width: "100%",
    height: "100%",
    padding: { xs: "22px 5px", md: "22px 30px" },
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
    height: "76px",
    alignSelf: "flex-start",
    margin: "0 20px 0 0",
    flexBasis: "60%",
  },
  logo: {
    display: { xs: "none", md: "block" },
    width: "50px",
    height: "50px",
    cursor: "pointer",
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

const BookmarkedJob: React.FC<any> = ({
  after,
  propStyles,
  job,
  userEmail,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [userLocalStorage, setUserLocalStorage] = useLocalStorage("user", null);
  const [imgError, setImgError] = useState<HTMLImageElement | null>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const currentTime: number = new Date().getTime();
  const postedTime = new Date(job.posted).getTime();
  const timeDifference = currentTime - postedTime;
  const user = useAppSelector((st) => st.user);

  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const daysAgo = Math.floor(timeDifference / oneDayInMilliseconds);

  const handleImageLoading = (e: any) => {
    setImgError(e);
  };

  const handleClickLink = (e: any) => {
    e.preventDefault();

    return router.push(`/jobs/${job._id}`);
  };

  const handleDeleteBookmarks = (
    e: any,
    id: string,
    type: "jobs" | "freelancers"
  ) => {
    e.preventDefault();

    try {
      return deleteBookmarks({
        itemId: id,
        userId: user?._id,
        userEmail: user?.email,
        type,
        dispatch,
        setUserLocalStorage,
      });
    } catch (error) {
      console.log(`pages/dashboard/bookmarks/handleDelete ${error}`);
    }
  };

  return (
    <Grid
      item
      container
      sx={{ ...bookmarkedJobClasses.item, ...propStyles }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Paper elevation={0} sx={bookmarkedJobClasses.itemContent}>
        <Box sx={bookmarkedJobClasses.info}>
          {/* company logo */}
          <Box sx={bookmarkedJobClasses.logo} onClick={handleClickLink}>
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
          <Box sx={bookmarkedJobClasses.innerInfoBlock}>
            <Box sx={bookmarkedJobClasses.positionName}>
              <Box
                sx={{
                  width: "auto",
                  cursor: "pointer",
                  justifyContent: "flex-start",
                }}
                onClick={handleClickLink}
              >
                {job?.position}
              </Box>
            </Box>
            {/* company name */}
            {job?.company && (
              <Box sx={bookmarkedJobClasses.companyName}>
                <BusinessIcon sx={bookmarkedJobClasses.icons} />
                {job?.company}
              </Box>
            )}
            {/* city name */}
            {job?.city && (
              <Box sx={bookmarkedJobClasses.cityName}>
                <LocationOnOutlinedIcon sx={bookmarkedJobClasses.icons} />
                {job?.city}
              </Box>
            )}
            {/* work schedules  */}
            {job?.job_type && (
              <Box sx={bookmarkedJobClasses.schedule}>
                <BusinessCenterOutlinedIcon sx={bookmarkedJobClasses.icons} />
                {job?.job_type.map((i: string, inx: number) => {
                  return <Box key={`${i}_${inx}`}>{i}</Box>;
                })}
              </Box>
            )}
            {/* time published  */}
            {job?.posted && (
              <Box sx={bookmarkedJobClasses.publishTime}>
                <AccessTimeOutlinedIcon sx={bookmarkedJobClasses.icons} />
                {daysAgo === 0
                  ? "today"
                  : daysAgo === 1
                  ? "yesterday"
                  : `${daysAgo} days ago`}
              </Box>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            opacity: hovered ? "100%" : "0%",
            transition: "all ease .3s",
            cursor: "pointer",
          }}
          onClick={(e) => handleDeleteBookmarks(e, job._id, "jobs")}
        >
          <Tooltip placement="left" title="Remove">
            {after}
          </Tooltip>
        </Box>
      </Paper>
    </Grid>
  );
};

const bookmarkedFreelancerClasses = {
  item: {
    width: "100%",
    margin: "0",
    padding: { xs: "22px 30px", lg: "35px 30px" },
    borderRadius: "4px",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "all .3s ease",
    flexFlow: "row nowrap",
    "&:hover": {
      bgcolor: "#fcfcfc",
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
    zIndex: "5",
    transform: { xs: "translateY(-35%)", lg: "translateY(-50%)" },
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

const BookmarkedFreelancer: React.FC<any> = ({
  after,
  propStyles,
  freelancer,
  userEmail,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [userLocalStorage, setUserLocalStorage] = useLocalStorage("user", null);
  const [imgError, setImgError] = useState<HTMLImageElement | null>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const sumOfStars = freelancer?.starRating?.reduce(
    (acc: number, current: number) => acc + current,
    0
  );
  const avarageStarRating = sumOfStars / freelancer?.starRating?.length;
  const user = useAppSelector((st) => st.user);

  const handleImageLoading = (e: any) => {
    setImgError(e);
  };

  const handleClickLink = (e: any) => {
    e.preventDefault();

    return router.push(`/freelancers/${freelancer._id}`);
  };

  const handleDeleteBookmarks = (
    e: any,
    id: string,
    type: "jobs" | "freelancers"
  ) => {
    e.preventDefault();

    try {
      return deleteBookmarks({
        itemId: id,
        userId: user?._id,
        userEmail: user?.email,
        type,
        dispatch,
        setUserLocalStorage,
      });
    } catch (error) {
      console.log(`pages/dashboard/bookmarks/handleDelete ${error}`);
    }
  };

  return (
    <Grid
      item
      container
      sx={{ ...bookmarkedFreelancerClasses.item, ...propStyles }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* avatar and basic info */}
      <Grid item container sx={bookmarkedFreelancerClasses.avatarBlock}>
        <Box sx={bookmarkedFreelancerClasses.avatar} onClick={handleClickLink}>
          {freelancer?.avatar ? (
            <Avatar
              src={freelancer?.avatar}
              onError={handleImageLoading}
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
          <Box sx={bookmarkedFreelancerClasses.name} onClick={handleClickLink}>
            {freelancer?.name || "Noname"}
          </Box>
          <Box sx={bookmarkedFreelancerClasses.position}>
            {freelancer?.current_position}
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
                <Box sx={bookmarkedFreelancerClasses.starRating}>
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

      <Box
        sx={{
          opacity: hovered ? "100%" : "0%",
          transition: "all ease .3s",
          cursor: "pointer",
        }}
        onClick={(e) => handleDeleteBookmarks(e, freelancer._id, "freelancers")}
      >
        <Tooltip placement="left" title="Remove">
          {after}
        </Tooltip>
      </Box>
    </Grid>
  );
};

export const Bookmarks: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation("bookmarks");
  const [userLocalStorage, setUserLocalStorage] = useLocalStorage("user", null);
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const user = useAppSelector((st) => st.user);
  const [hasFetchedBookmarks, setHasFetchedBookmarks] = useState(false);
  const { width } = useScreenSize();
  const isHidden = width < 990;

  useEffect(() => {
    userLocalStorage || router.push("/");
  }, []);

  useEffect(() => {
    if (user && !hasFetchedBookmarks) {
      fetchBookmarks(user, dispatch, setUserLocalStorage)
        .then(() => {
          setHasFetchedBookmarks(true);
        })
        .catch((error) => {
          setHasFetchedBookmarks(true);
        });
    }
  }, [user, hasFetchedBookmarks]);

  return (
    <Box
      sx={{
        width: "100%",
        margin: "81px 0 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <DashboardDrawer />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 6,
          bgcolor: "background.paper",
          minHeight: "100vh",
        }}
      >
        {isHidden && (
          <SettingsSubMenu
            burgerIsOpen={burgerIsOpen}
            setBurgerIsOpen={setBurgerIsOpen}
          />
        )}
        {/* heading */}
        <Box
          sx={{
            display: "flex",
            flexFlow: { xs: "column", md: "row nowrap" },
            justifyContent: "space-between",
            alignItems: "flex-start",
            margin: "0 0 50px",
            textTransform: "capitalize",
          }}
        >
          <Typography variant="h3" fontSize={"26px"} color="primary.dark">
            {`${t("header")}`}
          </Typography>

          <CustomizedBreadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            dataToMap={breadcrumbData}
          />
        </Box>
        {/* show saved jobs if there's any */}
        {user?.bookmarks?.jobs?.length > 0 && (
          <Grid
            container
            sx={{
              boxShadow: "0 0 20px 0 rgb(0 0 0 / 10%)",
              bgcolor: "background.default",
              margin: "0 0 30px",
            }}
          >
            <Grid
              item
              sx={{
                width: "100%",
                padding: "20px 30px",
                borderBottom: "1px solid #e4e4e4",
                fontSize: "16px",
                fontWeight: "600",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                alignContent: "center",
                color: "primary.dark",
              }}
            >
              <BusinessCenterOutlinedIcon
                sx={{
                  fontSize: "20px",
                  margin: "0 10px 0 0",
                  color: "secondary.main",
                }}
              />
              Bookmarked Jobs
            </Grid>

            <Grid item container>
              {user?.bookmarks?.jobs?.map((job: any, index: number) => (
                <BookmarkedJob
                  key={`${job}_${index}`}
                  job={job}
                  userEmail={user.email}
                  propStyles={{
                    height: "auto",
                    borderBottom: "1px solid #e4e4e4",
                  }}
                  after={
                    <Box
                      sx={{
                        width: "32px",
                        height: "32px",
                        margin: "0 10px 0 0",
                        bgcolor: "#dc3139",
                        borderRadius: "50%",
                        display: "flex",
                        zIndex: 5,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <DeleteOutlineOutlinedIcon
                        sx={{ color: "primary.main" }}
                        className="favIcon"
                      />
                    </Box>
                  }
                />
              ))}
            </Grid>
          </Grid>
        )}
        {/* show saved freelancers if there's any */}
        {user?.bookmarks?.freelancers?.length > 0 && (
          <Grid
            container
            sx={{
              boxShadow: "0 0 20px 0 rgb(0 0 0 / 10%)",
              bgcolor: "background.default",
              margin: "0 0 30px",
            }}
          >
            <Grid
              item
              sx={{
                width: "100%",
                fontWeight: "600",
                padding: "20px 30px",
                borderBottom: "1px solid #e4e4e4",
                fontSize: "16px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                alignContent: "center",
                color: "primary.dark",
              }}
            >
              <FacebookOutlinedIcon
                sx={{
                  fontSize: "20px",
                  margin: "0 10px 0 0",
                  color: "secondary.main",
                }}
              />
              Bookmarked Freelancers
            </Grid>

            <Grid item container>
              {user?.bookmarks?.freelancers?.map((fl: any, index: number) => (
                <BookmarkedFreelancer
                  key={`${fl}_${index}`}
                  freelancer={fl}
                  userEmail={user.email}
                  propStyles={{
                    height: "auto",
                    borderBottom: "1px solid #e4e4e4",
                  }}
                  after={
                    <Box
                      sx={{
                        width: "32px",
                        height: "32px",
                        margin: "0 10px 0 0",
                        bgcolor: "#dc3139",
                        borderRadius: "50%",
                        display: "flex",
                        zIndex: 5,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <DeleteOutlineOutlinedIcon
                        sx={{ color: "primary.main" }}
                        className="favIcon"
                      />
                    </Box>
                  }
                />
              ))}
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Bookmarks;
