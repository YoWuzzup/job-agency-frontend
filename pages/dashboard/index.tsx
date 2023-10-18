import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material/";

import { useLocalStorage, useScreenSize } from "../../hooks";
import { DashboardDrawer, SettingsSubMenu } from "../../components";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const [userLocalStorage, setUserLocalStorage] = useLocalStorage("user", null);
  const { width } = useScreenSize();
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const isHidden = width < 990;

  useEffect(() => {
    userLocalStorage || router.push("/");
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "background.default",
        margin: "81px 0 0",
        display: "flex",
      }}
    >
      <DashboardDrawer />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {isHidden && (
          <SettingsSubMenu
            burgerIsOpen={burgerIsOpen}
            setBurgerIsOpen={setBurgerIsOpen}
          />
        )}
        <Typography paragraph>
          There's no content for Dashboard page yet
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
