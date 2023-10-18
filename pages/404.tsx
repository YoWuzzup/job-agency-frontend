import type { NextPage } from "next";
import Head from "next/head";

import { CustomizedBreadcrumbs, Footer } from "../components/index";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import useTranslation from "next-translate/useTranslation";

const breadcrumbData = () => {
  const { t } = useTranslation("404");

  return [
    {
      linkTo: "/",
      label: `${t("breadcrumb.home")}`,
    },
    {
      linkTo: "#",
      label: `${t("breadcrumb.notFound")}`,
      active: true,
    },
  ];
};

const Custom404: NextPage = () => {
  const { t } = useTranslation("404");

  return (
    <>
      <Head>
        <title>JobMela</title>
        <meta name="description" content="404 page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{
          width: "100%",
          margin: "81px 0 0",
        }}
      >
        <Box
          sx={{
            width: {
              xs: "90%",
              md: "75%",
            },
            height: { xs: "60vh", md: "auto" },
            margin: "0 auto",
            padding: { xs: "20px 0", md: "70px 0" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexFlow: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexFlow: { xs: "column", sm: "row nowrap" },
              justifyContent: "space-between",
              margin: { xs: "0 0 30px", md: "0 0 90px" },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "primary.dark",
                fontSize: "30px",
                fontWeight: "fontWeightLight",
              }}
            >
              404 {`${t("header")}`}
            </Typography>
            <CustomizedBreadcrumbs
              dataToMap={breadcrumbData()}
              separator={<NavigateNextIcon fontSize="small" />}
            />
          </Box>

          <Box>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "100px", md: "210px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "> span": {
                  color: "secondary.main",
                },
              }}
            >
              4<span>0</span>4
              <HelpOutlineIcon
                sx={{
                  fontSize: { xs: "100px", md: "210px" },
                  color: "secondary.main",
                }}
              />
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "18px", md: "28px" },
                color: "#999",
                margin: { xs: "0", md: "0 0 145px" },
              }}
            >
              {`${t("info")}`}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default Custom404;
