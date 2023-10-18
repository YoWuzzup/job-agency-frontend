import React from "react";
import { Grid, Skeleton, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { DefaultInput, DefaultButton } from "../";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeSettingsData } from "../../redux/actions/common";
import useTranslation from "next-translate/useTranslation";

export const SettingsMyAccount: React.FC = () => {
  const { t } = useTranslation("settings");
  const data = useAppSelector((st) => st.settingsData);
  const user = useAppSelector((st) => st.user);
  const dispatch = useAppDispatch();

  const convertToBase64 = (e: any): void => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      dispatch(changeSettingsData({ ...data, avatar: reader.result }));
    };
    reader.onerror = (error) => {
      console.log(`SettingsMyAccount/convertToBase64: ${error}`);
    };
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedData = { ...data, [name]: value };
    dispatch(changeSettingsData(updatedData));
  };

  return (
    <Grid
      container
      sx={{
        boxShadow: "0 0 20px 0 rgb(0 0 0 / 10%)",
        bgcolor: "background.default",
        margin: "0 0 30px",
      }}
    >
      <Grid
        item
        sx={{
          width: "100%",
          padding: "20px 30px",
          borderBottom: "1px solid grey",
          fontSize: "16px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          alignContent: "center",
          color: "primary.dark",
        }}
      >
        <AccountCircleOutlinedIcon
          sx={{
            fontSize: "20px",
            margin: "0 10px 0 0",
            color: "secondary.main",
          }}
        />
        {`${t("accountBlock.header")}`}
      </Grid>

      {/* input block */}
      <Grid
        item
        container
        sx={{
          padding: "30px",
          flexFlow: { xs: "column", md: "row" },
          minHeight: "238px",
          gap: "2%",
          bgcolor: "",
        }}
      >
        {/* Picture/avatar */}
        <Grid
          item
          container
          sx={{
            flex: 1,
            padding: "0 30px 0 0",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
            {user?.avatar || data?.avatar ? (
              <img
                src={data?.avatar ? `${data?.avatar}` : `${user.avatar}`}
                alt="avatar"
                style={{ width: "150px", height: "150px" }}
              />
            ) : (
              <Skeleton
                variant="rectangular"
                width={"150px"}
                height={"150px"}
              />
            )}
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={convertToBase64}
            style={{ display: "none" }}
          />
        </Grid>

        {/* first name and account time fields */}
        <Grid
          item
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 2,
          }}
        >
          {/* First name */}
          <DefaultInput
            plholder={`${user?.name || "Name"}`}
            header={`${t("accountBlock.name")}`}
            ariaLabel="change First Name"
            handleChange={handleDataChange}
            inputName={"name"}
            propStyles={{
              flex: 1,
              width: "100%",
              margin: "0 0 17px",
              textTransform: "capitalize",
            }}
            inputPropStyles={{
              padding: "0",
              width: "100%",
              border: "1px solid #33333314",
            }}
            headerPropStyles={{
              fontSize: "16px",
              color: "primary.dark",
              fontWeight: 600,
              margin: "0 0 12px",
            }}
          />

          {/* account type */}
          <Grid
            item
            container
            sx={{
              flex: 1,
              justifyContent: "space-between",
              margin: "0 0 17px",
              flexFlow: { xs: "column", lg: "row wrap" },
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                color: "primary.dark",
                fontWeight: 600,
                margin: "0 0 12px",
                width: "100%",
                textTransform: "capitalize",
              }}
            >
              {`${t("accountBlock.accType.type")}`}
            </Typography>

            <DefaultButton
              propStyles={{
                width: { xs: "100%", lg: "47%" },
                margin: { xs: "0 0 15px 0", lg: "0" },
                height: "48px",
                bgcolor:
                  user?.accountType === "freelancer" ||
                  data?.accountType === "freelancer"
                    ? "#47bb67"
                    : "#f2f2f2",
                color:
                  user?.accountType === "freelancer" ||
                  data?.accountType === "freelancer"
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
              text={`${t("accountBlock.accType.freelancer")}`}
              handleClick={handleDataChange}
              before={
                <AccountCircleOutlinedIcon
                  sx={{ fontSize: "20px", margin: "0 10px 0 0" }}
                />
              }
            />

            <DefaultButton
              propStyles={{
                width: { xs: "100%", lg: "47%" },
                height: "48px",
                bgcolor:
                  user?.accountType === "employer" ||
                  data?.accountType === "employer"
                    ? "#47bb67"
                    : "#f2f2f2",
                color:
                  user?.accountType === "employer" ||
                  data?.accountType === "employer"
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
              text={`${t("accountBlock.accType.employer")}`}
              handleClick={handleDataChange}
              before={
                <BusinessCenterOutlinedIcon
                  sx={{ fontSize: "20px", margin: "0 10px 0 0" }}
                />
              }
            />
          </Grid>
        </Grid>

        {/* last name and email fields */}
        <Grid
          item
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 2,
          }}
        >
          {/* Last name */}
          <DefaultInput
            plholder={`${user?.surname || "Surname"}`}
            ariaLabel="change last name"
            handleChange={handleDataChange}
            inputName={"surname"}
            header={`${t("accountBlock.surname")}`}
            propStyles={{
              flex: 1,
              width: "100%",
              margin: "0 0 17px",
              textTransform: "capitalize",
            }}
            inputPropStyles={{
              padding: "0",
              width: "100%",
              border: "1px solid #33333314",
            }}
            headerPropStyles={{
              fontSize: "16px",
              color: "primary.dark",
              fontWeight: 600,
              margin: "0 0 12px",
            }}
          />

          {/* email input */}
          <DefaultInput
            plholder={`${user?.email || "email@example.com"}`}
            ariaLabel="change email"
            handleChange={handleDataChange}
            inputName={"email"}
            header={`${t("accountBlock.email")}`}
            propStyles={{
              flex: 1,
              width: "100%",
              margin: "0 0 17px",
              textTransform: "capitalize",
            }}
            inputPropStyles={{
              padding: "0",
              width: "100%",
              border: "1px solid #33333314",
            }}
            headerPropStyles={{
              fontSize: "16px",
              color: "primary.dark",
              fontWeight: 600,
              margin: "0 0 12px",
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
