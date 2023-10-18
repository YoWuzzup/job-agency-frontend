import type { NextPage } from "next";
import Head from "next/head";

import { Box, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  CommonRegisterForm,
  CustomizedBreadcrumbs,
  Footer,
} from "../../components";

const breadcrumbData = [
  {
    linkTo: "/",
    label: "home",
  },
  {
    linkTo: "#",
    label: "register",
    active: true,
  },
];

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>JobMela</title>
        <meta name="description" content="Register page" />
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
            margin: "0 auto",
            padding: "70px 0",
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
              flexFlow: "row nowrap",
              justifyContent: "space-between",
              margin: "0 0 90px",
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
              Register
            </Typography>
            <CustomizedBreadcrumbs
              dataToMap={breadcrumbData}
              separator={<NavigateNextIcon fontSize="small" />}
            />
          </Box>

          <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
            <CommonRegisterForm
              redirect={true}
              handlePageChange={() => {}}
              handleSignUpPopupClose={() => {}}
            />
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default Register;
