import { useState } from "react";
import { useRouter } from "next/router";
import { googleLogout, GoogleLogin } from "@react-oauth/google";
import {
  postAuthDataGoogle,
  postLogInData,
  postRegData,
} from "../../api/authentication";
import { DefaultButton, DefaultInput } from "..";

import { Tabs, Tab, Typography, Box, styled, Grid } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useAppDispatch, useLocalStorage } from "../../hooks";
import { signinUser } from "../../redux/actions/user";

// tabs container styles and interface
interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-scroller": {
    backgroundColor: "#f0f0f0",
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
});

// tab panel is content container, interface and styles
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Grid container>{children}</Grid>
        </Box>
      )}
    </Box>
  );
}

// single tab styled and with interface
interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  height: "62px",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(16),
  color: "#777",
  backgroundColor: "#f0f0f0",
  transition: "all ease .3s",
  border: "1px solid #33333314",
  "&:hover": {
    backgroundColor: "#33333314",
    color: "#333",
  },
  "&.Mui-selected": {
    color: "#00e2bd",
    backgroundColor: "#fff",
    "&:nth-of-type(1)": {
      border: "none",
    },
    "&:nth-of-type(2)": {
      borderBottom: "none",
    },
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#fff",
  },
}));

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export const CommonLoginForm: React.FC<{
  handlePageChange: (event: React.SyntheticEvent, newValue: number) => void;
  handleSignUpPopupClose: () => void;
  redirect?: boolean;
}> = ({ handlePageChange, handleSignUpPopupClose, redirect }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [userLocalStorage, setUserLocalStorage] = useLocalStorage("user", null);
  const [loginError, setLoginError] = useState<{
    statusCode: number;
    message: string;
    error: string;
  } | null>(null);

  const [loginData, setLogInData] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const handleLoginChange = async (e: any) => {
    setLogInData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginSubmit = (e: any) => {
    try {
      postLogInData(loginData)
        .then((res) => {
          setLoginError(null);
          // set user in local storage and redux
          setUserLocalStorage(res?.data?.user);
          dispatch(signinUser(res?.data?.user));
          redirect ? router.push("/") : handleSignUpPopupClose();
        })
        .catch((err) => {
          const { data } = err.response;
          setLoginError(data);
        });
    } catch (error) {
      console.log(`SignUpFormTabs error: ${error}`);
    }
  };

  return (
    <Grid container item sx={{ flexFlow: "column", alignItems: "center" }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "500",
          margin: "0 0 5px",
          width: "100%",
          textAlign: "center",
        }}
      >
        We're glad to see you again!
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: "primary.light",
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "center",
          margin: "0 0 35px",
        }}
      >
        Don't have an account?
        <Typography
          variant="body1"
          sx={{
            color: "secondary.main",
            cursor: "pointer",
            margin: "0 0 0 10px",
            transition: "all ease .3s",
            "&:hover": {
              color: "primary.dark",
            },
          }}
          onClick={(e) =>
            redirect ? router.push("/auth/register") : handlePageChange(e, 1)
          }
        >
          Sign Up!
        </Typography>
      </Typography>
      {/* email input */}
      <DefaultInput
        plholder={"Email Address"}
        ariaLabel="log in email"
        handleChange={handleLoginChange}
        inputName={"email"}
        before={
          <Box
            sx={{
              width: "48px",
              height: "48px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              border: "1px solid #33333314",
            }}
          >
            <EmailOutlinedIcon
              sx={{
                fontSize: "20px",
              }}
            />
          </Box>
        }
        propStyles={{ width: "100%", margin: "0 0 22px" }}
        inputPropStyles={{ padding: "0", border: "1px solid #33333314" }}
      />
      {/* password input */}
      <DefaultInput
        plholder={"Password"}
        ariaLabel="login password"
        handleChange={handleLoginChange}
        inputName={"password"}
        before={
          <Box
            sx={{
              width: "48px",
              height: "48px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              border: "1px solid #33333314",
            }}
          >
            <LockOutlinedIcon
              sx={{
                fontSize: "20px",
              }}
            />
          </Box>
        }
        propStyles={{ width: "100%", margin: "0 0 22px" }}
        inputPropStyles={{ padding: "0", border: "1px solid #33333314" }}
      />
      {loginError?.statusCode === 404 ? (
        <Box sx={{ color: "red", margin: "0 0 10px" }}>
          {loginError.message}
        </Box>
      ) : null}

      <Typography
        variant="body2"
        sx={{
          color: "#888",
          alignSelf: "flex-start",
          transition: "all ease .3s",
          "&:hover": {
            color: "secondary.main",
            cursor: "pointer",
          },
        }}
      >
        Forgot Password?
      </Typography>
      <DefaultButton
        text={"Log In"}
        handleClick={handleLoginSubmit}
        inputName="dummy"
        propStyles={{
          width: "100%",
          height: "48px",
          margin: "25px 0 0",
        }}
      />
    </Grid>
  );
};

export const CommonRegisterForm: React.FC<{
  handlePageChange: (event: React.SyntheticEvent, newValue: number) => void;
  handleSignUpPopupClose: () => void;
  redirect?: boolean;
}> = ({ handleSignUpPopupClose, handlePageChange, redirect }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [userLocalStorage, setUserLocalStorage] = useLocalStorage("user", null);
  const [error, setError] = useState<{
    statusCode: number;
    message: string;
    error: string;
  } | null>(null);

  const [registrationData, setRegistrationData] = useState<{
    email: string;
    password: string;
    confirmPassword: string;
    accountType: "freelancer" | "employer";
  }>({
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "freelancer",
  });

  const handleRegistrationChange = async (e: any) => {
    setRegistrationData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegistrationSubmit = (e: any) => {
    try {
      postRegData(registrationData)
        // on res set err null, close reg menu and go to home page
        .then((res) => {
          setError(null);
          // set user in local storage and redux
          setUserLocalStorage(res?.data?.user);
          dispatch(signinUser(res?.data?.user));
          redirect ? router.push("/") : handleSignUpPopupClose();
          router.push("/");
        })
        .catch((err) => {
          const { data } = err.response;
          setError(data);
        });
    } catch (error) {
      console.log(`SignUpFormTabs error: ${error}`);
    }
  };

  return (
    <Grid container item sx={{ flexFlow: "column", alignItems: "center" }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "500",
          margin: "0 0 5px",
          width: "100%",
          textAlign: "center",
        }}
      >
        Let's create your account!
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: "primary.light",
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "center",
          margin: "0 0 35px",
        }}
      >
        Already have an account?
        <Typography
          variant="body1"
          sx={{
            color: "secondary.main",
            cursor: "pointer",
            margin: "0 0 0 10px",
            transition: "all ease .3s",
            "&:hover": {
              color: "primary.dark",
            },
          }}
          onClick={(e) =>
            redirect ? router.push("/auth/login") : handlePageChange(e, 1)
          }
        >
          Log In!
        </Typography>
      </Typography>
      <Grid
        item
        container
        sx={{
          width: "100%",
          margin: "0 0 20px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DefaultButton
          propStyles={{
            width: "47%",
            height: "48px",
            bgcolor:
              registrationData.accountType === "freelancer"
                ? "#47bb67"
                : "#f2f2f2",
            color:
              registrationData.accountType === "freelancer"
                ? "primary.main"
                : "#888",
            borderRadius: "4px",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "all ease .3s",
            "&:hover": {
              color: "#289c41",
              bgcolor: "#e4f6e9",
            },
          }}
          inputName="accountType"
          text={"freelancer"}
          handleClick={handleRegistrationChange}
          before={
            <AccountCircleOutlinedIcon
              sx={{ fontSize: "20px", margin: "0 10px 0 0" }}
            />
          }
        />
        <DefaultButton
          propStyles={{
            width: "47%",
            height: "48px",
            bgcolor:
              registrationData.accountType === "employer"
                ? "#47bb67"
                : "#f2f2f2",
            color:
              registrationData.accountType === "employer"
                ? "primary.main"
                : "#888",
            borderRadius: "4px",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "all ease .3s",
            "&:hover": {
              color: "#289c41",
              bgcolor: "#e4f6e9",
            },
          }}
          inputName="accountType"
          text={"employer"}
          handleClick={handleRegistrationChange}
          before={
            <BusinessCenterOutlinedIcon
              sx={{ fontSize: "20px", margin: "0 10px 0 0" }}
            />
          }
        />
      </Grid>
      {/* email input */}
      <DefaultInput
        plholder={"Email Address"}
        ariaLabel="log in email"
        handleChange={handleRegistrationChange}
        inputName={"email"}
        before={
          <Box
            sx={{
              width: "48px",
              height: "48px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              border: "1px solid #33333314",
            }}
          >
            <EmailOutlinedIcon
              sx={{
                fontSize: "20px",
              }}
            />
          </Box>
        }
        propStyles={{
          width: "100%",
          margin: "0 0 22px",
        }}
        inputPropStyles={{
          padding: "0",
          border: "1px solid #33333314",
        }}
      />

      {error?.message === "Invalid Email" ? (
        <Box sx={{ color: "red", margin: "0 0 10px" }}>{error.message}</Box>
      ) : null}

      {/* password input */}
      <DefaultInput
        plholder={"Password"}
        handleChange={handleRegistrationChange}
        ariaLabel="register password"
        inputName={"password"}
        before={
          <Box
            sx={{
              width: "48px",
              height: "48px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              border: "1px solid #33333314",
            }}
          >
            <LockOutlinedIcon
              sx={{
                fontSize: "20px",
              }}
            />
          </Box>
        }
        propStyles={{
          width: "100%",
          margin: "0 0 22px",
          border: "#f0f0f0",
        }}
        inputPropStyles={{ padding: "0", border: "1px solid #33333314" }}
      />
      <DefaultInput
        plholder={"Repeat Password"}
        handleChange={handleRegistrationChange}
        inputName={"confirmPassword"}
        ariaLabel="register repeat password"
        before={
          <Box
            sx={{
              width: "48px",
              height: "48px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              border: "1px solid #33333314",
            }}
          >
            <LockOutlinedIcon
              sx={{
                fontSize: "20px",
              }}
            />
          </Box>
        }
        propStyles={{ width: "100%", margin: "0 0 22px" }}
        inputPropStyles={{
          padding: "0",
        }}
      />
      {/* Passwords are not matched or user exists errors*/}
      {error?.message === "Passwords are not matched" ||
      error?.message === "User already exists" ? (
        <Box sx={{ color: "red", margin: "0 0 10px" }}>{error.message}</Box>
      ) : null}

      <DefaultButton
        text={"Register"}
        handleClick={handleRegistrationSubmit}
        inputName="dummy"
        propStyles={{
          width: "100%",
          height: "48px",
          margin: "25px 0 0",
        }}
      />
    </Grid>
  );
};

export const ExternalAuthes: React.FC<{
  handleSignUpPopupClose: () => void;
  redirect?: boolean;
}> = ({ handleSignUpPopupClose, redirect }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [userLocalStorage, setUserLocalStorage] = useLocalStorage("user", null);

  return (
    <Box sx={{ width: "100%" }}>
      {/* -or- line */}
      <Grid
        item
        container
        sx={{
          flexFlow: "row nowrap",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 auto 25px",
          width: "90%",
        }}
      >
        <Grid
          item
          sx={{
            flexBasis: "45%",
            height: "1px",
            backgroundColor: "#e0e0e0",
          }}
        />
        <Grid item color={"#808080"}>
          or
        </Grid>
        <Grid
          item
          sx={{
            flexBasis: "45%",
            height: "1px",
            backgroundColor: "#e0e0e0",
          }}
        />
      </Grid>

      <Grid
        item
        container
        sx={{
          alignItems: "center",
          margin: "0 auto 50px",
          width: "90%",
          flexFlow: "row nowrap",
          justifyContent: "space-between",
        }}
      >
        <GoogleLogin
          onSuccess={(res) => {
            postAuthDataGoogle(res).then((res) => {
              // set user in local storage and redux
              setUserLocalStorage(res?.data?.user);
              dispatch(signinUser(res?.data?.user));
              redirect ? router.push("/") : handleSignUpPopupClose();
            });
          }}
          onError={() => {
            console.log("Google login failed");
          }}
        />
      </Grid>
    </Box>
  );
};

export const SignUpFormTabs: React.FC<{
  handleSignUpPopupClose: () => void;
}> = ({ handleSignUpPopupClose }) => {
  const [value, setValue] = useState(0);

  const handlePageChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <StyledTabs
          value={value}
          onChange={handlePageChange}
          aria-label="sign up and register tabs"
        >
          <StyledTab label="Log In" {...a11yProps(0)} />
          <StyledTab label="Register" {...a11yProps(1)} />
        </StyledTabs>
      </Box>

      {/* Log in tab content */}
      <TabPanel value={value} index={0}>
        <CommonLoginForm
          handlePageChange={handlePageChange}
          handleSignUpPopupClose={handleSignUpPopupClose}
        />
      </TabPanel>

      {/* Registration tab content */}
      <TabPanel value={value} index={1}>
        <CommonRegisterForm
          handleSignUpPopupClose={handleSignUpPopupClose}
          handlePageChange={handlePageChange}
        />
      </TabPanel>

      {/* facebook and google authorization buttons */}
      <ExternalAuthes handleSignUpPopupClose={handleSignUpPopupClose} />
    </Box>
  );
};
