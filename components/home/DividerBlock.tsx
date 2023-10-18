import { memo } from "react";
import { Box, Typography } from "@mui/material";
import { sectionBg } from "../../public/index";
import { DefaultButton } from "../HOCS/DefaultInputs/DefaultButton";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

export const DividerBlock: React.FC = memo(() => {
  const router = useRouter();
  const common = useTranslation("common");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    return router.push("freelancers");
  };

  return (
    <Box
      sx={{
        height: "517px",
        backgroundImage: `url("${sectionBg.src}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* shadow box */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.7,
          backgroundColor: "#333",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          margin: "0 auto",
          width: "80%",
          display: "flex",
          flexFlow: "column",
          color: "common.white",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "inherit",
            fontSize: "34px",
            margin: "0 0 25px 0",
            flexBasis: "50%",
          }}
        >
          Hire experts or be hired. <br />
          For any job, any time.
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "inherit",
            opacity: "0.85",
            fontSize: 18,
            width: { xs: "100%", md: "50%" },
            margin: "0 0 35px",
          }}
        >
          Bring to the table win-win survival strategies to ensure proactive
          domination. At the end of the day, going forward, a new normal that
          has evolved from generation is on the runway towards.
        </Typography>

        <DefaultButton
          inputName="toFreelancersBtn"
          text={`${common.t("buttons.getStarted")}`}
          handleClick={handleClick}
          propStyles={{
            width: "163px",
            height: "44px",
          }}
        />
      </Box>
    </Box>
  );
});
