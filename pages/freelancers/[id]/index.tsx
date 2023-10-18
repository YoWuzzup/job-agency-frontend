import { NextPage } from "next";
import { useEffect, useState } from "react";

import { Avatar, Box, Grid, Skeleton, Typography, Rating } from "@mui/material";
import {
  DefaultButton,
  Footer,
  InfoAbout,
  InfoHeader,
  LinearWithValueLabel,
  Pagination,
} from "../../../components";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import BusinessIcon from "@mui/icons-material/Business";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

// bg image
import { freelancer } from "../../../public/index";
import { getSingleFreelancer } from "../../../redux/actions/freelancers";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import useTranslation from "next-translate/useTranslation";

const FreelancersId: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");
  const singleFreelancer = useAppSelector((st) => st.singleFreelancer);
  const [feedbacksPageNumber, setFeedbacksPageNumber] = useState<number>(1);
  const [feedbacksLength, setFeedbacksLength] = useState<number>(4);
  const [showContactInfo, setShowContactInfo] = useState<boolean>(false);

  // first get only feedbacks that have rating then slice them for pagination
  const feedbacksWithRating = singleFreelancer?.feedbacks?.filter(
    (feedback: { rating: any }) => typeof feedback.rating === "number"
  );

  const slicedFeedbacks = feedbacksWithRating?.slice(
    (feedbacksPageNumber - 1) * feedbacksLength,
    (feedbacksPageNumber - 1) * feedbacksLength + feedbacksLength
  );

  const handlePaginationChange = (
    e: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setFeedbacksPageNumber(page);
  };

  const calculateFeedbacks = (name: string): number => {
    const average = singleFreelancer?.feedbacks?.reduce(
      (count: number, obj: any) => (obj[name] ? count + 1 : count),
      0
    );

    return Math.floor((average / singleFreelancer?.feedbacks?.length) * 100);
  };

  const currentPositionStartDate = (d: string) => {
    const date = new Date(d);
    const dateString = date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
    const [month, year] = dateString.split(" ");

    return `${month} ${year}`;
  };

  useEffect(() => {
    dispatch(getSingleFreelancer(router?.query?.id)).catch((er) =>
      router.push("/freelancers")
    );
  }, []);

  return (
    <>
      <InfoHeader
        bgImage={singleFreelancer?.bgImage || freelancer}
        type={"freelancer"}
        info={{
          avatar: singleFreelancer?.avatar,
          country: singleFreelancer?.country,
          feedbacks: feedbacksWithRating,
          currentPosition: singleFreelancer?.current_position,
          fullName: `${singleFreelancer?.name} ${singleFreelancer?.surname}`,
        }}
      />

      {/* main content about */}
      {/* main container */}
      <Grid
        container
        sx={{
          width: { xs: "90%", sm: "80%", md: "90%", lg: "75%" },
          margin: { xs: "0 auto 2rem", sm: "0 auto" },
          flexFlow: { xs: "column", md: "row nowrap" },
        }}
      >
        {/* main section */}
        <Grid container item>
          {/* description block */}
          <InfoAbout
            header={`${t("freelancerId.about")}`}
            description={singleFreelancer.about}
          />

          {/* work history and feedbacks */}
          <Grid
            item
            container
            sx={{ flexFlow: "column", margin: "0 0 65px", flexBasis: "95%" }}
          >
            <Typography
              sx={{
                bgcolor: "background.paper",
                height: "67px",
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "0 35px 0",
                fontSize: "20px",
                margin: "0 0 35px",
                textTransform: "capitalize",
              }}
            >
              <ThumbUpOutlinedIcon
                sx={{
                  color: "secondary.main",
                  margin: "0 10px 0 0 ",
                }}
              />
              {`${t("freelancerId.feedbacks")}`}
            </Typography>

            {/* all freelancer's Work History and Feedbacks container  */}
            <Grid item container sx={{ flexFlow: "column" }}>
              {slicedFeedbacks?.map((feedback: any, i: number) => {
                return (
                  <Grid
                    item
                    container
                    key={`${feedback?.employer}_${i}`}
                    sx={{
                      flexFlow: { xs: "column", md: "row wrap" },
                      padding: "0 30px",
                      gap: "5%",
                      margin: "0 0 45px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "primary.dark",
                        fontSize: "18px",
                        fontWeight: "bold",
                        flexFlow: "row nowrap",
                        flexBasis: "100%",
                        margin: "0 0 10px",
                      }}
                    >
                      {feedback?.employer}
                    </Typography>

                    <Box
                      sx={{
                        flexBasis: "100%",
                        display: "flex",
                        flexFlow: { xs: "column", sm: "row nowrap" },
                        gap: "5%",
                        color: "#808080",
                        fontSize: "16px",
                        margin: "0 0 15px",
                      }}
                    >
                      <Grid
                        item
                        container
                        sx={{
                          width: "auto",
                          alignItems: "center",
                          flexFlow: "row nowrap",
                          margin: { xs: "0 10px 12px 0", md: "0 20px 0 0" },
                        }}
                      >
                        <Grid
                          sx={{
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
                          }}
                        >
                          {feedback?.rating?.toFixed(1)}
                        </Grid>
                        <Rating
                          name="freelancer-feedbacks-rating-readonly"
                          value={feedback?.rating}
                          precision={0.5}
                          readOnly
                        />
                      </Grid>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CalendarMonthOutlinedIcon
                          sx={{
                            color: "inherit",
                            fontSize: "17px",
                            margin: "0 5px 0 0",
                          }}
                        />
                        {feedback.date
                          ? currentPositionStartDate(feedback?.date)
                          : ""}
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        flexBasis: "100%",
                        color: "#808080",
                        fontSize: "16px",
                      }}
                    >
                      {feedback?.comment}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>

            {singleFreelancer?.feedbacks?.length > 4 && (
              <Pagination
                count={Math.ceil(singleFreelancer?.feedbacks?.length / 4)}
                page={feedbacksPageNumber}
                onChange={handlePaginationChange}
              />
            )}
          </Grid>

          {/* employment history */}
          {/* here first goes the current position and then go presious ones */}
          <Grid
            item
            container
            sx={{ flexFlow: "column", margin: "0 0 65px", flexBasis: "95%" }}
          >
            <Typography
              sx={{
                bgcolor: "background.paper",
                height: "67px",
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "0 35px 0",
                fontSize: "20px",
                margin: "0 0 35px",
                textTransform: "capitalize",
              }}
            >
              <BusinessIcon
                sx={{
                  color: "secondary.main",
                  margin: "0 10px 0 0 ",
                }}
              />
              {`${t("freelancerId.employment")}`}
            </Typography>

            {/* all freelancer's jobs container  */}
            <Grid item container sx={{ flexFlow: "column" }}>
              {/* current job info container */}
              <Grid
                item
                container
                sx={{
                  flexFlow: { xs: "column", md: "row nowrap" },
                  padding: "0 30px",
                  gap: "5%",
                  margin: "0 0 45px",
                }}
              >
                {/* company's logo */}
                <Box sx={{ height: "60px", width: "60px" }}>
                  {singleFreelancer?.current_position?.company_logo ? (
                    <Avatar
                      src={singleFreelancer?.current_position?.company_logo}
                      alt={singleFreelancer?.current_position?.company_name}
                      sx={{
                        width: "inherit",
                        height: "inherit",
                        boxShadow: "0 0 10px rgba(0,0,0,.1)",
                        "& .MuiAvatar-img ": {
                          objectFit: "contain",
                        },
                      }}
                    />
                  ) : (
                    <Skeleton
                      variant="circular"
                      width={"100%"}
                      height={"100%"}
                    />
                  )}
                </Box>

                <Box
                  sx={{
                    flexBasis: "85%",
                    display: "flex",
                    flexFlow: "row wrap",
                  }}
                >
                  <Typography
                    sx={{
                      color: "primary.dark",
                      fontSize: "18px",
                      fontWeight: "bold",
                      flexFlow: "row nowrap",
                      width: "100%",
                      margin: "0 0 10px",
                    }}
                  >
                    {singleFreelancer?.current_position?.position}
                  </Typography>

                  <Box
                    sx={{
                      flexBasis: "100%",
                      display: "flex",
                      flexFlow: "row wrap",
                      gap: "5%",
                      color: "#808080",
                      fontSize: "16px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        margin: { xs: "0 0 1rem", sm: "0" },
                      }}
                    >
                      <BusinessIcon
                        sx={{
                          color: "inherit",
                          fontSize: "17px",
                          margin: "0 5px 0 0",
                        }}
                      />
                      {singleFreelancer?.current_position?.company_name}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        margin: { xs: "0 0 1rem", sm: "0" },
                      }}
                    >
                      <CalendarMonthOutlinedIcon
                        sx={{
                          color: "inherit",
                          fontSize: "17px",
                          margin: "0 5px 0 0",
                        }}
                      />
                      {currentPositionStartDate(
                        singleFreelancer?.current_position?.start_date
                      )}{" "}
                      - Present
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      flexBasis: "100%",
                      color: "#808080",
                      fontSize: "16px",
                    }}
                  >
                    {singleFreelancer?.current_position?.description}
                  </Box>
                </Box>
              </Grid>

              {/* map through previous freelancer's jobs  */}
              {singleFreelancer?.previous_positions?.map(
                (previousJob: any, i: number) => {
                  return (
                    <Grid
                      item
                      container
                      key={`${previousJob?.position}_${i}`}
                      sx={{
                        flexFlow: { xs: "column", md: "row nowrap" },
                        padding: "0 30px",
                        gap: "5%",
                        margin: "0 0 45px",
                      }}
                    >
                      {/* company's logo */}
                      <Box sx={{ height: "60px", width: "60px" }}>
                        {previousJob?.company_logo ? (
                          <Avatar
                            src={previousJob?.company_logo}
                            alt={previousJob?.company_name}
                            sx={{
                              width: "inherit",
                              height: "inherit",
                              boxShadow: "0 0 10px rgba(0,0,0,.1)",
                              "& .MuiAvatar-img ": {
                                objectFit: "contain",
                              },
                            }}
                          />
                        ) : (
                          <Skeleton
                            variant="circular"
                            width={"100%"}
                            height={"100%"}
                          />
                        )}
                      </Box>

                      <Box
                        sx={{
                          flexBasis: "85%",
                          display: "flex",
                          flexFlow: "row wrap",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "primary.dark",
                            fontSize: "18px",
                            fontWeight: "bold",
                            flexFlow: "row nowrap",
                            width: "100%",
                            margin: "0 0 10px",
                          }}
                        >
                          {previousJob?.position}
                        </Typography>

                        <Box
                          sx={{
                            flexBasis: "100%",
                            display: "flex",
                            flexFlow: { xs: "column", sm: "row nowrap" },
                            gap: "5%",
                            color: "#808080",
                            fontSize: "16px",
                            margin: "0 0 15px",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <BusinessIcon
                              sx={{
                                color: "inherit",
                                fontSize: "17px",
                                margin: "0 5px 0 0",
                              }}
                            />
                            {previousJob?.company_name}
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CalendarMonthOutlinedIcon
                              sx={{
                                color: "inherit",
                                fontSize: "17px",
                                margin: "0 5px 0 0",
                              }}
                            />
                            {currentPositionStartDate(previousJob?.start_date)}{" "}
                            - {currentPositionStartDate(previousJob?.end_date)}
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            flexBasis: "100%",
                            color: "#808080",
                            fontSize: "16px",
                          }}
                        >
                          {previousJob?.description}
                        </Box>
                      </Box>
                    </Grid>
                  );
                }
              )}
            </Grid>
          </Grid>
        </Grid>

        {/* right side with summary */}
        <Grid
          container
          item
          sx={{
            flexBasis: { xs: "100%", md: "50%" },
            alignContent: "flex-start",
          }}
        >
          <Grid container item sx={{ margin: "65px 0 25px" }}>
            <Grid item sx={{ width: "47%" }}>
              <Typography color="primary.dark">{`$${singleFreelancer?.rate}`}</Typography>
              <Typography
                color="primary.contrastText"
                sx={{ fontSize: "16px", textTransform: "capitalize" }}
              >
                {`${t("freelancerId.rate")}`}
              </Typography>
            </Grid>
            <Grid item sx={{ width: "47%" }}>
              <Typography color="primary.dark">{`$${singleFreelancer?.jobs_done?.length}`}</Typography>
              <Typography
                color="primary.contrastText"
                sx={{ fontSize: "16px", textTransform: "capitalize" }}
              >
                {`${t("freelancerId.done")}`}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            container
            sx={{
              transition: "all .5s",
              height: showContactInfo ? "70px" : "0px",
              flexFlow: "column",
            }}
          >
            {singleFreelancer?.email}
            {singleFreelancer?.phone_number}
          </Grid>

          <DefaultButton
            propStyles={{
              width: "100%",
              height: "55px",
              borderRadius: "4px",
              margin: "0 0 50px",
              "&:hover": {
                transform: "translateY(-5%)",
                boxShadow: "0 2px 8px rgba(42,65,232,.35)",
              },
            }}
            after={
              <ArrowRightAltIcon
                sx={{
                  margin: "0 0 0 5px",
                }}
              />
            }
            text={`${t("buttons.makeAnOffer")}`}
            handleClick={(e) => setShowContactInfo(!showContactInfo)}
            inputName={"Make an Offer"}
          />
          {/* right side with summary */}
          {/* stats */}
          <Grid
            container
            item
            sx={{
              justifyContent: "space-between",
              margin: "0 0 50px",
              flexFlow: { xs: "column", sm: "row wrap" },
            }}
          >
            <Grid item sx={{ width: "47%" }}>
              <LinearWithValueLabel
                value={calculateFeedbacks("success")}
                name={`${t("freelancerId.success")}`}
              />
            </Grid>
            <Grid item sx={{ width: "47%" }}>
              <LinearWithValueLabel
                value={calculateFeedbacks("will_recommend")}
                name={`${t("freelancerId.recommendation")}`}
              />
            </Grid>
            <Grid item sx={{ width: "47%" }}>
              <LinearWithValueLabel
                value={calculateFeedbacks("on_time")}
                name={`${t("freelancerId.onTime")}`}
              />
            </Grid>
            <Grid item sx={{ width: "47%" }}>
              <LinearWithValueLabel
                value={calculateFeedbacks("on_budget")}
                name={`${t("freelancerId.onBudget")}`}
              />
            </Grid>
          </Grid>
          {/* right side with summary */}
          {/* social media */}
          {/* TODO */}
          {/* <Grid item container>
            <Grid item>
              <Tooltip arrow title="Instagram" placement="top">
                <InstagramIcon
                  sx={{
                    fontSize: "30px",
                    color: "primary.light",
                    margin: "0 10px",
                  }}
                />
              </Tooltip>
            </Grid>

            <Grid
              item
              sx={{
                margin: "0 0 50px",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Tooltip arrow title="LinkedIn" placement="top">
                <LinkedInIcon
                  sx={{
                    fontSize: "30px",
                    color: "primary.light",
                    margin: "0 10px",
                  }}
                />
              </Tooltip>
            </Grid>
          </Grid> */}

          {singleFreelancer?.skills && (
            <Grid
              container
              item
              sx={{
                flexFlow: "row wrap",
                gap: "2%",
              }}
            >
              <Typography
                sx={{ flexBasis: "100%", margin: "0 0 20px", fontSize: "20px" }}
              >
                {`${t("freelancerId.skills")}`}
              </Typography>
              {singleFreelancer?.skills?.map((skill: string, index: number) => (
                <Grid
                  item
                  container
                  key={`${skill}_${index}`}
                  sx={{
                    bgcolor: "rgba(42,65,232,.07)",
                    width: "auto",
                    padding: "6px 12px",
                    margin: "0 0 4px",
                    color: "secondary.main",
                    fontSize: "14.7px",
                    border: "none",
                    borderRadius: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {skill}
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>

      {/* footer */}
      <Footer />
    </>
  );
};

export default FreelancersId;
