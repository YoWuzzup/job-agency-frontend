import React, { memo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import {
  Tooltip,
  Button,
  Avatar,
  Container,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  AppBar,
  Box,
  Toolbar,
  Grid,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LoginIcon from "@mui/icons-material/Login";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { classes } from "./NavBarStyle";

import { DialogWithSignUp, Languages, ToggleButton } from "..";
import {
  useAppDispatch,
  useAppSelector,
  useLocalStorage,
  useScreenSize,
} from "../../hooks";
import { signoutUser } from "../../redux/actions/user";
import { postSignout } from "../../api/authentication";

const settings = [
  {
    name: "dashboard",
    icon: <DashboardOutlinedIcon />,
    url: "/dashboard",
  },
  {
    name: "settings",
    icon: <SettingsOutlinedIcon />,
    url: `/dashboard/settings`,
  },
  {
    name: "logout",
    icon: <LogoutIcon />,
    url: `/`,
  },
];

const pages = [
  {
    name: "home",
    url: "",
  },
  {
    name: "jobs",
    url: "jobs",
  },
  {
    name: "freelancers",
    url: "freelancers",
  },
];

const LanguageAndTheme: React.FC<any> = memo(({ stickedOrNotHome }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "row nowrap",
        flexBasis: "auto",
        "&>*": {
          width: "81px",
          height: "81px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Languages stickedOrNotHome={stickedOrNotHome} />
      {/* change theme btn */}
      {/* <ToggleButton /> */}
    </Box>
  );
});

const PageButton: React.FC<any> = memo(
  ({ page, handleCloseNavMenu, stickedOrNotHome, t }) => {
    return (
      <Button
        onClick={handleCloseNavMenu}
        sx={
          (classes.buttons,
          {
            color: `${
              stickedOrNotHome ? "primary.contrastText" : "primary.main"
            }`,
            ":hover": {
              bgcolor: "transparent",
              color: `${stickedOrNotHome ? "secondary.main" : "primary.main"}`,
              "& .navBar_icon": {
                color: "primary.main",
                backgroundColor: `background.main`,
              },
            },
          })
        }
        endIcon={
          <Box
            className="navBar_icon"
            sx={{
              color: `${
                stickedOrNotHome ? "primary.contrastText" : "primary.main"
              }`,
              backgroundColor: `${
                stickedOrNotHome ? "transparent" : "rgba(255,255,255,.15)"
              }`,
              display: "inherit",
              justifyContent: "center",
              alignItems: "center",
              transition: "all .5s",
              borderRadius: "15%",
              width: "20px",
              height: "17px",
            }}
          >
            <ArrowDropDownIcon />
          </Box>
        }
        disableRipple
      >
        <Link href={`/${page.url}`}>
          <a
            style={{
              textTransform: "capitalize",
            }}
          >
            {t(`navbar.${page.name}`)}
          </a>
        </Link>
      </Button>
    );
  }
);

const SmallScreenBar: React.FC<any> = memo(
  ({ handleOpenNavMenu, anchorElNav, handleCloseNavMenu, t }) => {
    return (
      <Box sx={classes.miniMenuBox}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
        >
          <MenuIcon sx={{ color: "black" }} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            ...classes.mainBoxMenuButtons,
            display: { xs: "block", md: "none" },
            "& .MuiPaper-root": {
              bgcolor: "background.secondary",
              p: 0,
              m: 0,
            },
          }}
        >
          {pages.map((page, index) => (
            <Button
              onClick={handleCloseNavMenu}
              key={`${page}_${index}`}
              sx={{
                ...classes.buttons,
                width: "100%",
                color: `secondary.main`,
                justifyContent: "flex-start",
                p: "0 2rem",
                ":hover": {
                  "& .navBar_icon": {
                    color: "primary.main",
                    backgroundColor: `background.main`,
                  },
                },
              }}
              endIcon={
                <Box
                  className="navBar_icon"
                  sx={{
                    color: `primary.contrastText`,
                    backgroundColor: `transparent`,
                    display: "inherit",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "all .5s",
                    borderRadius: "15%",
                    width: "20px",
                    height: "17px",
                  }}
                >
                  <ArrowDropDownIcon />
                </Box>
              }
              disableRipple
            >
              <Link href={`/${page.url}`}>
                <a
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {t(`navbar.${page.name}`)}
                </a>
              </Link>
            </Button>
          ))}
        </Menu>
      </Box>
    );
  }
);

const BigScreenBar: React.FC<any> = memo(
  ({ stickedOrNotHome, handleCloseNavMenu, t }) => {
    return (
      <Box sx={classes.mainBoxMenuButtons}>
        {pages.map((page, index) => (
          <PageButton
            page={page}
            key={`${page.name}_${index}`}
            index={index}
            handleCloseNavMenu={handleCloseNavMenu}
            stickedOrNotHome={stickedOrNotHome}
            t={t}
          />
        ))}
      </Box>
    );
  }
);

const MyNavBar: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isMainPage = router.pathname === "/";
  const { t } = useTranslation("common");
  const [userLocalStorage, setUserLocalStorage] = useLocalStorage("user", null);
  // if user is logged in
  const user = useAppSelector((state) => state.user);
  const [sticked, setSticked] = React.useState<boolean>(false);
  const { width } = useScreenSize();
  const stickedOrNotHome = sticked || !isMainPage;
  const [openSignUpForm, setOpenSignUpForm] = React.useState<boolean>(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleNavigation = useCallback(
    (url: string) => {
      router.push(`${url}`);
    },
    [router]
  );

  const handleUserLogout = useCallback(() => {
    try {
      postSignout().then(() => {
        setUserLocalStorage(null);
        dispatch(signoutUser(null));
      });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, setUserLocalStorage]);

  const handleOpenNavMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    },
    []
  );

  const handleOpenUserMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    },
    []
  );

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleScroll = () => {
    const pos = window.scrollY;
    setSticked(pos > 100);
  };

  const handleSignUpPopupOpen = () => {
    setOpenSignUpForm(true);
  };

  const handleSignUpPopupClose = () => {
    setOpenSignUpForm(false);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        ...classes.AppBar,
        backgroundColor: `${
          stickedOrNotHome ? "background.default" : "transparent"
        }`,
      }}
    >
      <Container maxWidth={false} sx={classes.container}>
        <Toolbar disableGutters sx={classes.toolbar}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              ...classes.logo,
              textAlign: { xs: "center", md: "end" },
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            <Link href={"/"}>JobMela</Link>
          </Typography>

          {width > 900 ? (
            <BigScreenBar
              stickedOrNotHome={stickedOrNotHome}
              handleCloseNavMenu={handleCloseNavMenu}
              t={t}
            />
          ) : (
            <SmallScreenBar
              t={t}
              handleCloseNavMenu={handleCloseNavMenu}
              handleOpenNavMenu={handleOpenNavMenu}
              anchorElNav={anchorElNav}
            />
          )}

          <LanguageAndTheme stickedOrNotHome={stickedOrNotHome} />

          {/* show log in / register or profile buttons if logged in or not */}
          {user ? (
            <Box sx={classes.profileBox}>
              <Tooltip title="Open menu">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    animation: "checkAnim 2s infinite",
                  }}
                >
                  {/* Add profile avatar */}
                  <Avatar
                    alt={`${user?.name}`}
                    src={`${user?.avatar}`}
                    sx={{
                      width: "42px",
                      height: "42px",
                      boxShadow: "0 0 10px grey",
                      borderRadius: "50%",
                    }}
                  />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{
                  mt: "60px",
                  textTransform: "capitalize",
                  p: 0,
                  "& .MuiMenu-list": {
                    bgcolor: "background.default",
                    p: 0,
                  },
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Grid
                  container
                  sx={{
                    p: "25px",
                    maxWidth: "290px",
                    gap: "5%",
                    borderBottom: "1px solid #e6e6e6",
                  }}
                >
                  <IconButton
                    sx={{
                      p: 0,
                      animation: "checkAnim 2s infinite",
                      width: "42px",
                      height: "42px",
                    }}
                  >
                    <Avatar
                      alt={`${user?.name}`}
                      src={`${user?.avatar}`}
                      sx={{
                        width: "inherit",
                        height: "inherit",
                        boxShadow: "0 0 10px grey",
                        cursor: "default",
                        borderRadius: "50%",
                      }}
                    />
                  </IconButton>

                  <Grid item container sx={{ flexBasis: "70%" }}>
                    <Typography textAlign="center" sx={{ fontSize: "16px" }}>
                      {user?.name}
                    </Typography>
                    <Typography
                      textAlign="center"
                      sx={{
                        color: "#888",
                        fontSize: "14.7px",
                        fontWeight: 400,
                        flexBasis: "100%",
                        textAlign: "start",
                      }}
                    >
                      {user?.current_position?.position}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item sx={{ flexFlow: "column", p: "25px" }}>
                  {settings.map((setting, index) => (
                    <MenuItem
                      sx={{
                        p: 0,
                        "&:hover": {
                          bgcolor: "inherit",
                          color: "secondary.main",
                          transition: "all .3s ease",
                        },
                      }}
                      key={`${setting.name}_${index}`}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (setting.name === "logout") {
                          handleUserLogout();
                        }

                        handleNavigation(setting.url);
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: "inherit",
                          "& .MuiSvgIcon-root": {
                            fontSize: "1rem",
                            width: "25px",
                          },
                        }}
                      >
                        {setting.icon}
                      </ListItemIcon>
                      <Typography textAlign="center">
                        {" "}
                        {t(`navbar.userMenu.${setting.name}`)}
                      </Typography>
                    </MenuItem>
                  ))}
                </Grid>
              </Menu>
            </Box>
          ) : (
            <>
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: { xs: "0 5px 0 0", sm: "0 30px" },
                  color: `${
                    stickedOrNotHome ? "primary.contrastText" : "primary.main"
                  }`,
                  textTransform: "capitalize",
                  fontSize: "16px",
                  fontWeight: "normal",
                  height: "100%",
                  borderLeft: "1px solid #6666",
                  borderRadius: 0,
                  "&:hover": {
                    color: "secondary.main",
                  },
                }}
                disableRipple
                onClick={handleSignUpPopupOpen}
              >
                <LoginIcon sx={{ margin: "0 5px 0 0", fontSize: "18px" }} />
                Log In / Register
              </Button>
              <DialogWithSignUp
                openSignUpForm={openSignUpForm}
                handleSignUpPopupClose={handleSignUpPopupClose}
              />
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export const NavBar = memo(MyNavBar);
