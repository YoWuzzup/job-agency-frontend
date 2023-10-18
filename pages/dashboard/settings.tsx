import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Typography, Box, Grid } from "@mui/material/";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {
  useAppDispatch,
  useAppSelector,
  useLocalStorage,
  useScreenSize,
} from "../../hooks";
import {
  CustomizedBreadcrumbs,
  DashboardDrawer,
  DefaultButton,
  SettingsMyAccount,
  SettingsMyProfile,
  SettingsSubMenu,
} from "../../components";
import { postUserDataChange } from "../../api/users";
import { changeUser } from "../../redux/actions/user";
import React from "react";
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
    label: "settings",
    active: true,
  },
];

export const Settings: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation("settings");
  const commonTranslation = useTranslation("common");
  const [userLocalStorage, setUserLocalStorage] = useLocalStorage("user", null);
  const [avatar, setAvatar] = useState<null | string>(null);
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const data = useAppSelector((st) => st.settingsData);
  const user = useAppSelector((st) => st.user);
  const { width } = useScreenSize();
  const isHidden = useMemo(() => width < 990, [width]);

  useEffect(() => {
    userLocalStorage || router.push("/");
  }, [user]);

  const uploadToServer = useCallback(async () => {
    const body = new FormData();
    body.append("data", JSON.stringify(data));

    await postUserDataChange(user._id, body).then((res) =>
      dispatch(changeUser(user, res?.data))
    );
  }, [data, user, dispatch]);

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
          p: { xs: 1, sm: 6 },
          bgcolor: "background.paper",
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
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 0 50px",
            flexFlow: { xs: "column", md: "row nowrap" },
          }}
        >
          <Typography
            variant="h3"
            fontSize={"26px"}
            color="primary.dark"
            sx={{
              mb: { xs: "20px", md: 0 },
              textTransform: "capitalize",
            }}
          >
            {`${t("header")}`}
          </Typography>

          <CustomizedBreadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            dataToMap={breadcrumbData}
          />
        </Box>

        {/* My Account */}
        <SettingsMyAccount />

        {/* My Profile */}
        <SettingsMyProfile />

        {/*  Password & Security */}
        <Grid></Grid>

        <DefaultButton
          text={`${commonTranslation.t("buttons.saveChanges")}`}
          handleClick={uploadToServer}
          inputName={"saving"}
          propStyles={{ padding: "10px 22px", width: "auto" }}
        />
      </Box>
    </Box>
  );
};

export default React.memo(Settings);
