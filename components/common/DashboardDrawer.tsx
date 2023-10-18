import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  List,
  Drawer,
  Box,
} from "@mui/material/";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { postSignout } from "../../api/authentication";
import { signoutUser } from "../../redux/actions/user";
import { useAppDispatch, useLocalStorage, useScreenSize } from "../../hooks";
import useTranslation from "next-translate/useTranslation";

const drawerWidth = 280;

const menu = () => {
  const { t } = useTranslation("common");

  return [
    {
      header: t("dashboardDrawer.start.header"),
      tabs: [
        {
          text: t("dashboardDrawer.start.tabs.dashboard"),
          icon: <DashboardOutlinedIcon />,
          url: "",
          name: "dashboard",
        },
        {
          text: t("dashboardDrawer.start.tabs.bookmarks"),
          icon: <StarBorderIcon />,
          url: "bookmarks",
          name: "bookmarks",
        },
      ],
    },
    {
      header: t("dashboardDrawer.organize.header"),
      tabs: [],
    },
    {
      header: t("dashboardDrawer.account.header"),
      tabs: [
        {
          text: t("dashboardDrawer.account.tabs.settings"),
          icon: <SettingsOutlinedIcon />,
          url: "settings",
          name: "settings",
        },
        {
          text: t("dashboardDrawer.account.tabs.logout"),
          icon: <LogoutIcon />,
          url: "logout",
          name: "logout",
        },
      ],
    },
  ];
};

export const DashboardDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [userLocalStorage, setUserLocalStorage] = useLocalStorage("user", null);
  const [activeButton, setactiveButton] = useState("dashboard");
  const { width } = useScreenSize();

  const handleMenuClick = (e: any, item: any) => {
    e.preventDefault();

    const { name, url } = item;

    setactiveButton(name);

    if (name.includes("logout")) {
      try {
        postSignout().then(() => {
          setUserLocalStorage(null);
          dispatch(signoutUser(null));
        });

        return router.push("/");
      } catch (error) {
        console.log(error);
      }
    }

    router.push(`/dashboard/${url}`);
  };

  useEffect(() => {
    let url = router.pathname;
    let words = url.split("/");
    let lastWord = words[words.length - 1];

    return setactiveButton(lastWord);
  }, []);

  return (
    <Drawer
      sx={{
        display: width < 990 ? "none" : "auto",
        width: drawerWidth,
        boxShadow: "0 0 20px 0 rgb(0 0 0 / 10%)",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: "background.default",
          margin: "81px 0 0",
          boxSizing: "border-box",
          zIndex: "5",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {menu().map((i: any, index: number) => {
          return (
            <Box key={`${i.header}_${index}`}>
              <ListItem
                sx={{
                  color: "secondary.main",
                  fontSize: "14px",
                  padding: "0",
                  margin: "30px 32px 16px",
                  textTransform: "capitalize",
                }}
              >
                {i.header}
              </ListItem>
              {i.tabs?.map((item: any, ind: number) => {
                return (
                  <ListItem
                    key={`${item.name}_${ind}`}
                    disablePadding
                    sx={{ width: "100%" }}
                    onClick={(e) => handleMenuClick(e, item)}
                  >
                    <ListItemButton
                      sx={{
                        padding: "11px 32px",
                        width: "100%",
                        transition: "all .3s",
                        borderLeft:
                          activeButton === item.name
                            ? "3px solid #00e2bd"
                            : "3px solid #fff",
                        color:
                          activeButton === item.name
                            ? "secondary.main"
                            : "primary.dark",
                        bgcolor:
                          activeButton === item.name
                            ? "rgba(0, 0, 0, 0.04)"
                            : "none",
                        "&:hover": {
                          color: "secondary.main",
                          bgcolor: "rgba(0, 0, 0, 0.04)",
                          borderLeft: "3px solid #00e2bd",
                          "& > *": {
                            transition: "all .3s",
                            color: "secondary.main",
                          },
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color:
                            activeButton === item.name
                              ? "secondary.main"
                              : "primary.dark",
                          width: "auto",
                          minWidth: "auto",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        sx={{
                          textTransform: "capitalize",
                          margin: "0 0 0 15px",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </Box>
          );
        })}
      </List>
    </Drawer>
  );
};
