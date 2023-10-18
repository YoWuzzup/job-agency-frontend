import { memo, useMemo } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { useAppSelector } from "../../hooks";

import { Grid, Paper } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { classes } from "./RecentJobsStyles";

import { DefaultButton } from "../HOCS/DefaultInputs/DefaultButton";
import { SingleJob } from "../common/SingleJob";

export const RecentJobs: React.FC = memo(() => {
  const router = useRouter();
  const recentVacancies = useAppSelector(
    (st) => st?.introInfo?.recentVacancies
  );
  const memoizedRecentVacancies = useMemo(
    () => recentVacancies,
    [recentVacancies]
  );
  const common = useTranslation("common");
  const home = useTranslation("home");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    return router.push("jobs");
  };

  return (
    <Grid container columns={1} direction={"column"} sx={classes.root}>
      <Grid item container sx={classes.top}>
        <Paper elevation={0} sx={classes.header}>
          {home.t("recentJobs.header")}
        </Paper>

        <DefaultButton
          inputName="browse_btn"
          text={`${common.t("buttons.browse")}`}
          handleClick={handleClick}
          propStyles={{ width: "auto" }}
          after={
            <ArrowRightAltIcon
              sx={{
                margin: "0 0 0 5px",
              }}
            />
          }
        />
      </Grid>

      <Grid
        item
        container
        columns={1}
        direction={"column"}
        sx={classes.itemsContainer}
      >
        {memoizedRecentVacancies?.map((vac: any, index: number) => {
          return (
            <SingleJob
              job={vac}
              translation={`${common.t("buttons.applyNow")}`}
              key={`${vac.timePublished}_${index}`}
              after={
                <DefaultButton
                  inputName="applyNow_btn"
                  text={`${common.t("buttons.applyNow")}`}
                  propClassNames={`recentjobs_btn`}
                  propStyles={{
                    bgcolor: "background.paper",
                    width: { xs: "90%", md: "180px" },
                    margin: { xs: "15px 0 0", md: 0 },
                    color: "primary.contrastText",
                  }}
                />
              }
            />
          );
        })}
      </Grid>
    </Grid>
  );
});
