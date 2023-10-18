import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Burger } from "..";

import { useAppDispatch, useLocalStorage } from "../../hooks";

import { postSignout } from "../../api/authentication";
import { signoutUser } from "../../redux/actions/user";

const drawerWidth = 280;

const menu = [
  {
    header: "start",
    tabs: [
      {
        name: "dashboard",
        icon: <DashboardOutlinedIcon />,
        url: "/",
      },
      { name: "bookmarks", icon: <StarBorderIcon />, url: "/bookmarks" },
    ],
  },
  {
    header: "organize and manage",
    tabs: [],
  },
  {
    header: "account",
    tabs: [
      {
        name: "settings",
        icon: <SettingsOutlinedIcon />,
        url: "/dashboard/settings",
      },
      {
        name: "logout",
        icon: <LogoutIcon />,
        url: "/",
      },
    ],
  },
];

export const SettingsSubMenu: React.FC<{
  setBurgerIsOpen: (e: boolean) => void;
  burgerIsOpen: boolean;
}> = ({ setBurgerIsOpen, burgerIsOpen }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [activeButton, setactiveButton] = useState("dashboard");
  const [userLocalStorage, setUserLocalStorage] = useLocalStorage("user", null);

  const handleMenuClick = (e: any, name: string) => {
    e.preventDefault();

    setactiveButton(name);

    if (name === "logout") {
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

    if (name === "dashboard") {
      return router.push("/dashboard");
    }

    router.push(`/dashboard/${name}`);
  };

  useEffect(() => {
    let url = router.pathname;
    let words = url.split("/");
    let lastWord = words[words.length - 1];

    return setactiveButton(lastWord);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        margin: "0 auto 1em",
        width: "100%",
        bgcolor: "primary.dark",
        color: "primary.main",
        borderRadius: "5px",
        position: "relative",
        alignItems: "center",
        flexFlow: "row wrap",
      }}
    >
      <Typography
        sx={{
          flexBasis: "auto",
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          cursor: "pointer",
          padding: "16px 0",
        }}
        onClick={() => setBurgerIsOpen(!burgerIsOpen)}
      >
        <Burger open={burgerIsOpen} propStyles={{ margin: "0 20px 0 20px" }} />
        Dashboard Navigation
      </Typography>

      <Box
        sx={{
          width: "100%",
          boxShadow: "0 0 20px 0 rgb(0 0 0 / 10%)",
          flexShrink: 0,
          flexBasis: "100%",
          bgcolor: "background.default",
          margin: "0",
          maxHeight: burgerIsOpen ? "1000px" : "0px",
          overflow: "hidden",
          transition: "all 0.3s linear",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "background.default",
            margin: "81px 0 0",
            boxSizing: "border-box",
            zIndex: "5",
          },
        }}
      >
        <List
          sx={{
            width: "100%",
          }}
        >
          {menu.map((i: any, index: number) => {
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
                      onClick={(e) => handleMenuClick(e, item.name)}
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
                          primary={item.name}
                          sx={{
                            textTransform: "capitalize",
                            margin: "0 0 0 15px",
                            "& .MuiTypography-root": {
                              fontSize: "15px",
                            },
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
      </Box>
    </Box>
  );
};
