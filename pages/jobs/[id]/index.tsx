import { NextPage } from "next";
import { useEffect, useState } from "react";

import {
  DefaultButton,
  Footer,
  InfoAbout,
  InfoHeader,
  MemoizedGoogleMap,
} from "../../../components";

import { Grid, Typography } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";

// bg image
import { singleJob } from "../../../public/index";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchSingleJob } from "../../../api/jobs";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

const classes = {
  salaryContainer: {
    flexBasis: { xs: "100%", md: "30%", lg: "25%" },
    height: { xs: "90px", md: "107px" },
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    fontSize: "16px",
    fontWeight: { xs: "fontWeightBold", md: "fontWeightLight" },
    color: { xs: "primary.dark", md: "primary.contrastText" },
    padding: { xs: "0", md: "0 25px" },
    margin: { xs: "20px 0 0", md: "0" },
    borderRadius: "4px",
    bgcolor: { xs: "none", md: "background.default" },
    boxShadow: { xs: "none", md: "0 3px 8px rgb(0 0 0 / 8%)" },
  },
};

const HeaderAfter = ({ styles, salary }: any) => {
  const { t } = useTranslation("common");
  return (
    <Grid container item sx={{ ...classes.salaryContainer, ...styles }}>
      {t("jobId.annualSalary")}
      <Grid
        item
        sx={{
          fontSize: { xs: "22px", md: "26px", lg: "28px" },
          lineHeight: "24px",
          color: "primary.dark",
          fontWeight: "fontWeightLight",
          margin: "8px 0 0",
        }}
      >
        {Array.isArray(salary) && salary.length > 1
          ? `$${salary[0]} - $${salary[1]}`
          : Array.isArray(salary) && salary.length === 1
          ? `$${salary[0]}`
          : `${salary}`}
      </Grid>
    </Grid>
  );
};

const JobId: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const companyAndVacancyInfo = useAppSelector((st) => st.singleJob);
  const [showContactInfo, setShowContactInfo] = useState<boolean>(false);
  const { t } = useTranslation("common");
  const currentTime: number = new Date().getTime();
  const postedTime: number = new Date(
    companyAndVacancyInfo?.current_vacancy?.posted
  ).getTime();
  const timeDifference: number = currentTime - postedTime;

  const oneDayInMilliseconds: number = 24 * 60 * 60 * 1000;
  const daysAgo: number = Math.floor(timeDifference / oneDayInMilliseconds);

  useEffect(() => {
    try {
      fetchSingleJob(router?.query?.id, dispatch);
    } catch (error) {
      console.log(`something wrong jobs/[id]/index/useEffect ${error}`);
    }
  }, []);

  return (
    <>
      <InfoHeader
        bgImage={singleJob}
        after={
          companyAndVacancyInfo?.current_vacancy?.salary &&
          companyAndVacancyInfo?.current_vacancy?.salary.length !== 0 ? (
            <HeaderAfter
              salary={companyAndVacancyInfo?.current_vacancy?.salary}
            />
          ) : undefined
        }
        type={"company"}
        info={{
          avatar: companyAndVacancyInfo?.avatar,
          country: companyAndVacancyInfo?.country,
          feedbacks: companyAndVacancyInfo?.feedbacks,
          currentPosition: companyAndVacancyInfo?.current_vacancy,
          fullName: companyAndVacancyInfo?.name,
        }}
      />

      {/* main content about */}
      {/* main container */}
      <Grid
        container
        sx={{
          width: { xs: "90%", sm: "80%", md: "90%", lg: "75%" },
          margin: "0 auto",
          flexFlow: { xs: "column", md: "row nowrap" },
        }}
      >
        {/* main section */}
        <Grid container item>
          {/* description block */}
          <InfoAbout
            header={`${t("jobId.description")}`}
            description={companyAndVacancyInfo?.current_vacancy?.description}
          />

          {/* location with map */}
          <Grid
            item
            container
            sx={{ flexFlow: "column", margin: "0 0 65px", flexBasis: "95%" }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "primary.dark",
                fontSize: "20px",
                fontWeight: "300",
                margin: "0 0 25px",
                textTransform: "capitalize",
              }}
            >
              {t("jobId.location")}
            </Typography>
            <Grid item>
              <MemoizedGoogleMap
                city={companyAndVacancyInfo?.current_vacancy?.city}
              />
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
            margin: "65px 0 0",
          }}
        >
          <Grid
            item
            container
            sx={{
              transition: "all .5s",
              height: showContactInfo ? "70px" : "0px",
              flexFlow: "column",
            }}
          >
            {companyAndVacancyInfo?.email}
            {companyAndVacancyInfo?.phone_number}
          </Grid>

          <DefaultButton
            propStyles={{
              width: "100%",
              height: "55px",
              borderRadius: "4px",
              margin: "0 0 35px",
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
            text={`${t("buttons.applyNow")}`}
            handleClick={() => setShowContactInfo(!showContactInfo)}
            inputName={"apply"}
          />

          <Grid
            item
            container
            sx={{
              width: "100%",
              borderRadius: "4px",
              flexFlow: "column",
              padding: "0 0 35px",
              margin: "0 0 50px",
              bgcolor: "#f9f9f9",
              textTransform: "capitalize",
            }}
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
              }}
            >
              {t("jobId.summary")}
            </Typography>

            <Grid
              item
              container
              sx={{
                padding: "0 35px",
                flexFlow: "row nowrap",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <LocationOnOutlinedIcon
                sx={{
                  color: "secondary.main",
                  margin: "0 0 0 5px",
                }}
              />
              <Grid
                item
                container
                sx={{
                  margin: "0 20px 25px",
                  fontSize: "16px",
                  color: "primary.dark",
                  fontWeight: "fontWeightBold",
                  flexFlow: "column",
                }}
              >
                {t("jobId.location")}
                <Grid
                  item
                  sx={{
                    fontWeight: "fontWeightLight",
                    color: "primary.contrastText",
                  }}
                >
                  {`${companyAndVacancyInfo?.current_vacancy?.city || ""} ${
                    companyAndVacancyInfo?.current_vacancy?.country || ""
                  }`}
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              container
              sx={{
                padding: "0 35px",
                flexFlow: "row nowrap",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <BusinessCenterOutlinedIcon
                sx={{
                  color: "secondary.main",
                  margin: "0 0 0 5px",
                }}
              />
              <Grid
                item
                container
                sx={{
                  margin: "0 20px 25px",
                  fontSize: "16px",
                  color: "primary.dark",
                  fontWeight: "fontWeightBold",
                  flexFlow: "column",
                }}
              >
                {t("jobId.type")}
                <Grid
                  item
                  sx={{
                    fontWeight: "fontWeightLight",
                    color: "primary.contrastText",
                  }}
                >
                  {companyAndVacancyInfo?.current_vacancy?.job_type.join(", ")}
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              container
              sx={{
                padding: "0 35px",
                flexFlow: "row nowrap",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <LocalAtmOutlinedIcon
                sx={{
                  color: "secondary.main",
                  margin: "0 0 0 5px",
                }}
              />
              <Grid
                item
                container
                sx={{
                  margin: "0 20px 25px",
                  fontSize: "16px",
                  color: "primary.dark",
                  fontWeight: "fontWeightBold",
                  flexFlow: "column",
                }}
              >
                {t("jobId.salary")}
                <Grid
                  item
                  sx={{
                    fontWeight: "fontWeightLight",
                    color: "primary.contrastText",
                  }}
                >
                  {Array.isArray(
                    companyAndVacancyInfo?.current_vacancy?.salary
                  ) && companyAndVacancyInfo?.current_vacancy?.salary.length > 1
                    ? `$${companyAndVacancyInfo?.current_vacancy?.salary[0]} - $${companyAndVacancyInfo?.current_vacancy?.salary[1]}`
                    : Array.isArray(
                        companyAndVacancyInfo?.current_vacancy?.salary
                      ) &&
                      companyAndVacancyInfo?.current_vacancy?.salary.length ===
                        1
                    ? `$${companyAndVacancyInfo?.current_vacancy?.salary[0]}`
                    : `${companyAndVacancyInfo?.current_vacancy?.salary}`}
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              container
              sx={{
                padding: "0 35px",
                flexFlow: "row nowrap",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <WatchLaterOutlinedIcon
                sx={{
                  color: "secondary.main",
                  margin: "0 0 0 5px",
                }}
              />
              <Grid
                item
                container
                sx={{
                  margin: "0 20px 25px",
                  fontSize: "16px",
                  color: "primary.dark",
                  fontWeight: "fontWeightBold",
                  flexFlow: "column",
                }}
              >
                {t("jobId.date")}
                <Grid
                  item
                  sx={{
                    fontWeight: "fontWeightLight",
                    color: "primary.contrastText",
                  }}
                >
                  {daysAgo === 0
                    ? "today"
                    : daysAgo === 1
                    ? "yesterday"
                    : `${daysAgo} days ago`}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* footer */}
      <Footer />
    </>
  );
};

export default JobId;
