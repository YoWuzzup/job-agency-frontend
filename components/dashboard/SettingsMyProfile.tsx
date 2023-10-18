import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Grid,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import AddIcon from "@mui/icons-material/Add";
import { DefaultInput, DefaultRangeSlider } from "..";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeSettingsData } from "../../redux/actions/common";
import useTranslation from "next-translate/useTranslation";

export const SettingsMyProfile: React.FC = () => {
  const data = useAppSelector((st) => st.settingsData);
  const user = useAppSelector((st) => st.user);
  const { t } = useTranslation("settings");
  const dispatch = useAppDispatch();
  const [currentSkill, setCurrentSkill] = useState<string>("");
  const [skillArrayToShow, setSkillArrayToShow] = useState<string[]>([]);
  const [maxFileSizeError, setMaxFileSizeError] = useState<boolean>(false);
  const [CVanimation, setCVAnimation] = useState<boolean>(false);
  const [contractAnimation, setContractAnimation] = useState<boolean>(false);

  const handleNationalityChange = (value: { code: string; label: string }) => {
    dispatch(changeSettingsData({ ...data, nationality: value }));
  };

  const isOptionEqualToValue = (
    option: CountryType,
    value: CountryType | null
  ) => {
    return value !== null && option.code === value.code;
  };

  const handleAddSkillToArray = () => {
    if (currentSkill.trim() !== "") {
      const updatedArray = [...skillArrayToShow, currentSkill];
      setSkillArrayToShow(updatedArray);
      dispatch(changeSettingsData({ ...data, skills: updatedArray }));
    }
    setCurrentSkill("");
  };

  const handleRemoveSkillFromArray = (skill: string) => {
    const filteredArray: string[] = skillArrayToShow?.filter(
      (s: string) => s !== skill
    );
    setSkillArrayToShow(filteredArray);
    dispatch(changeSettingsData({ ...data, skills: filteredArray }));
  };

  const convertToBase64 = (e: any): void => {
    const file = e.target.files[0];
    if (file) {
      const maxFileSizeInMB = 2;
      const maxFileSizeInKB = 1024 * 1024 * maxFileSizeInMB;
      if (file.size > maxFileSizeInKB) {
        return setMaxFileSizeError(true);
      }
      setMaxFileSizeError(false);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        dispatch(
          changeSettingsData({
            ...data,
            attachments: {
              ...data.attachments,
              [e.target.name]: {
                name: file.name,
                lastModified: file.lastModified,
                size: file.size,
                type: file.type,
                webkitRelativePath: file.webkitRelativePath,
                result: reader.result,
              },
            },
          })
        );
      };
      reader.onerror = (error) => {
        console.log(`SettingsMyProfile/convertToBase64: ${error}`);
      };
    }
  };

  const handleRemoveAttachments = (name: string): void => {
    dispatch(
      changeSettingsData({
        ...data,
        attachments: { ...data.attachments, [name]: { state: "deleted" } },
      })
    );
    setMaxFileSizeError(false);
  };

  const handleDataChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;

    const updatedData = { ...data, [name]: value };
    dispatch(changeSettingsData(updatedData));
  };

  useEffect(() => {
    if (user?.skills?.length !== skillArrayToShow?.length)
      setSkillArrayToShow(user?.skills);
  }, [user?.skills]);

  return (
    <>
      <Grid
        container
        sx={{
          boxShadow: "0 0 20px 0 rgb(0 0 0 / 10%)",
          bgcolor: "background.default",
          margin: "0 0 30px",
        }}
      >
        {/* header my profile */}
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
            textTransform: "capitalize",
          }}
        >
          <FaceIcon
            sx={{
              fontSize: "20px",
              margin: "0 10px 0 0",
              color: "secondary.main",
            }}
          />
          {t("profileBlock.header")}
        </Grid>

        <Grid
          item
          container
          sx={{
            padding: "30px",
            flexFlow: { xs: "column nowrap", lg: "row wrap" },
            minHeight: "238px",
            gap: "2%",
            borderBottom: "1px solid grey",
          }}
        >
          {/* minimal hourly rate */}
          <Grid item container sx={{ flex: 1, alignItems: "flex-start" }}>
            <Typography
              sx={{
                fontSize: "16px",
                color: "primary.contrastText",
                display: "flex",
                flexFlow: { xs: "column", md: "row" },
                textTransform: "capitalize",
              }}
            >
              {t("profileBlock.rate")}
            </Typography>
            <DefaultRangeSlider
              header={`$`}
              headerPropStyles={{
                color: "primary.dark",
                fontSize: "26px",
                margin: "0 0 10px",
              }}
              propStyles={{
                "& > *": {
                  width: "100%",
                },
                "& .MuiSlider-thumb": {
                  width: "40px !important",
                  height: "29px !important",
                  border: "1px solid #888",
                  borderRadius: "5px",
                  boxShadow: "0 0 20px 0 rgb(0 0 0 / 10%)",
                  "&:after": {
                    content: "''",
                    display: "inline-block",
                    width: 0,
                    height: 0,
                    borderTop: "5px solid transparent",
                    borderBottom: "5px solid transparent",
                    borderLeft: "5px solid #888",
                    verticalAlign: "middle",
                    marginLeft: "5px",
                  },
                  "&:before": {
                    content: "' '",
                    display: "inline-block",
                    width: 0,
                    height: 0,
                    borderTop: "5px solid transparent",
                    borderBottom: "5px solid transparent",
                    borderRight: "5px solid #888",
                    verticalAlign: "middle",
                    marginRight: "10px",
                  },
                },
              }}
              minValue={data?.rate || user?.rate || 5}
              valueShownInHeader={true}
              propHandleChange={handleDataChange}
              propName="rate"
              step={1}
              min={5}
              max={150}
              valueDisplay={false}
            />
          </Grid>

          {/* skills */}
          <Grid
            item
            container
            sx={{
              flex: 1,
              alignContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                color: "primary.contrastText",
                display: "flex",
                flexFlow: "row",
                margin: "0 0 12px",
                textTransform: "capitalize",
              }}
            >
              {t("profileBlock.skills.skills")}
            </Typography>

            <DefaultInput
              plholder={t("profileBlock.skills.plholder")}
              ariaLabel="skills"
              inputName="skills"
              handleChange={(e) => setCurrentSkill(e.target.value)}
              propValue={currentSkill}
              inputPropStyles={{
                border: "1px solid",
                borderColor: "background.paper",
              }}
              propStyles={{
                margin: "0 0 15px",
              }}
              after={
                <AddIcon
                  sx={{
                    width: "36px",
                    height: "36px",
                    color: "primary.main",
                    bgcolor: "background.main",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={handleAddSkillToArray}
                />
              }
            />

            {/* map through skills */}
            <Grid
              item
              container
              sx={{
                flexFlow: "row wrap",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "3%",
              }}
            >
              {skillArrayToShow?.map((skill: string, index: number) => {
                return (
                  <Grid
                    item
                    container
                    key={`${skill}_${index}`}
                    sx={{
                      bgcolor: "rgba(42,65,232,.07)",
                      width: "auto",
                      padding: "6px 12px",
                      m: "0 0 10px",
                      color: "secondary.main",
                      fontSize: "14.7px",
                      border: "none",
                      borderRadius: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CloseIcon
                      sx={{
                        cursor: "pointer",
                        fontSize: "18px",
                        margin: "0 5px 0 0",
                      }}
                      onClick={(e) => handleRemoveSkillFromArray(skill)}
                    />
                    {skill}
                  </Grid>
                );
              })}
            </Grid>
          </Grid>

          {/* Attachments */}
          <Grid item container sx={{ flex: 1, alignItems: "flex-start" }}>
            <Typography
              sx={{
                fontSize: "16px",
                color: "primary.dark",
                display: "flex",
                flexFlow: "row",
                margin: "0 0 12px",
                textTransform: "capitalize",
              }}
            >
              {t("profileBlock.attachments.attachments")}
            </Typography>

            <Grid
              item
              container
              sx={{
                flexFlow: { xs: "column", sm: "row wrap" },
                gap: "2%",
                justifyContent: "space-between",
                alignItems: { xs: "center", md: "normal" },
              }}
            >
              <Grid
                item
                container
                onMouseEnter={(e) =>
                  Boolean(
                    (user?.attachments?.cv &&
                      user?.attachments?.cv?.state !== "deleted") ||
                      (data?.attachments?.cv &&
                        data?.attachments?.cv?.state !== "deleted")
                  ) && setCVAnimation(true)
                }
                onMouseLeave={(e) => setCVAnimation(false)}
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: "4px 0 4px 4px",
                  width: { xs: "90%", sm: "45%" },
                  position: "relative",
                  padding: "15px 10px 15px 20px",
                  margin: "0 0 15px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    borderWidth: "0 20px 20px 0",
                    borderStyle: "solid",
                    borderColor: "rgba(0,0,0,.15) #fff",
                    transition: ".3s",
                    borderRadius: "0 0 0 4px",
                  },
                }}
              >
                <label
                  htmlFor="addingCV"
                  style={{
                    fontSize: "14px",
                    width: "100%",
                    cursor: "pointer",
                    fontWeight: "500",
                    textTransform: "capitalize",
                  }}
                >
                  {t("profileBlock.attachments.cv")}
                  <Grid
                    item
                    container
                    sx={{
                      fontSize: "14px",
                      color: "#999",
                      margin: "10px 0 0",
                      flexFlow: "column",
                      flexBasis: "100%",
                    }}
                  >
                    PDF
                    <Grid item sx={{ lineBreak: "anywhere" }}>
                      {data?.attachments?.cv?.name}
                    </Grid>
                  </Grid>
                </label>
                <Zoom
                  in={Boolean(
                    (user?.attachments?.cv &&
                      user?.attachments?.cv?.state !== "deleted") ||
                      (data?.attachments?.cv &&
                        data?.attachments?.cv?.state !== "deleted")
                  )}
                >
                  <DownloadDoneIcon
                    sx={{
                      padding: "5px",
                      margin: "10px 0 0",
                      fontSize: "30px",
                      bgcolor: "green",
                      color: "#fff",
                      borderRadius: "5px",
                      transition: "all ease .3s",
                    }}
                  />
                </Zoom>
                <Zoom in={CVanimation}>
                  <Tooltip title="Remove" placement="top">
                    <DeleteForeverIcon
                      onClick={() => handleRemoveAttachments("cv")}
                      sx={{
                        padding: "5px",
                        margin: "10px 0 0",
                        fontSize: "30px",
                        bgcolor: "red",
                        color: "#fff",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "all ease .3s",
                      }}
                    />
                  </Tooltip>
                </Zoom>
                <input
                  id="addingCV"
                  type="file"
                  name="cv"
                  accept="application/pdf"
                  onChange={convertToBase64}
                  style={{ display: "none" }}
                />
              </Grid>
              <Grid
                item
                container
                onMouseEnter={(e) =>
                  Boolean(
                    (user?.attachments?.contract &&
                      user?.attachments?.contract?.state !== "deleted") ||
                      (data?.attachments?.contract &&
                        data?.attachments?.contract?.state !== "deleted")
                  ) && setContractAnimation(true)
                }
                onMouseLeave={(e) => setContractAnimation(false)}
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: "4px 0 4px 4px",
                  position: "relative",
                  padding: "15px 10px 15px 20px",
                  margin: "0 0 15px",
                  width: { xs: "90%", sm: "45%" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    borderWidth: "0 20px 20px 0",
                    borderStyle: "solid",
                    borderColor: "rgba(0,0,0,.15) #fff",
                    transition: ".3s",
                    borderRadius: "0 0 0 4px",
                  },
                }}
              >
                <label
                  htmlFor="contract"
                  style={{
                    fontSize: "14px",
                    width: "100%",
                    fontWeight: "500",
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                >
                  {t("profileBlock.attachments.contract")}
                  <Grid
                    item
                    sx={{
                      fontSize: "14px",
                      color: "#999",
                      margin: "10px 0 0",
                      flexBasis: "100%",
                    }}
                  >
                    DOCX
                    <Grid
                      item
                      sx={{
                        flexBasis: "100%",
                        lineBreak: "anywhere",
                      }}
                    >
                      {data?.attachments?.contract?.name}
                    </Grid>
                  </Grid>
                </label>

                <Zoom
                  in={Boolean(
                    (user?.attachments?.contract &&
                      user?.attachments?.contract?.state !== "deleted") ||
                      (data?.attachments?.contract &&
                        data?.attachments?.contract?.state !== "deleted")
                  )}
                >
                  <DownloadDoneIcon
                    sx={{
                      padding: "5px",
                      margin: "10px 0 0",
                      fontSize: "30px",
                      bgcolor: "green",
                      color: "#fff",
                      borderRadius: "5px",
                      transition: "all ease .3s",
                    }}
                  />
                </Zoom>
                <Zoom in={contractAnimation}>
                  <Tooltip title="Remove" placement="top">
                    <DeleteForeverIcon
                      onClick={() => handleRemoveAttachments("contract")}
                      sx={{
                        padding: "5px",
                        margin: "10px 0 0",
                        fontSize: "30px",
                        bgcolor: "red",
                        color: "#fff",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "all ease .3s",
                      }}
                    />
                  </Tooltip>
                </Zoom>
                <input
                  id="contract"
                  name="contract"
                  type="file"
                  accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={convertToBase64}
                  style={{ display: "none" }}
                />
              </Grid>

              <Grid
                item
                sx={{
                  flexBasis: "100%",
                  color: maxFileSizeError ? "red" : "#888",
                  fontSize: "14px",
                  margin: "0 0 0 10px",
                  textTransform: "capitalize",
                }}
              >
                {t("profileBlock.attachments.fileSize")}: 2 MB
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* basic info block */}
        <Grid
          item
          container
          sx={{
            padding: "30px",
            flexDirection: "row",
            minHeight: "238px",
            gap: "2%",
            justifyContent: "space-between",
          }}
        >
          {/* Tags input */}
          <Grid item container sx={{ flexBasis: "45%" }}>
            <Typography
              sx={{
                fontSize: "16px",
                color: "primary.dark",
                flexBasis: "100%",
                margin: "0 0 12px",
                fontWeight: "500",
                textTransform: "capitalize",
              }}
            >
              {t("profileBlock.tagline.tagline")}
            </Typography>
            <DefaultInput
              plholder={
                data?.tagline
                  ? data.tagline
                  : user?.tagline
                  ? user.tagline
                  : "iOS Expert + Node Dev"
              }
              ariaLabel={"Tagline"}
              inputName={"tagline"}
              handleChange={handleDataChange}
              propStyles={{ margin: "0" }}
            />
          </Grid>
          {/* Nationality input */}
          <Grid item container sx={{ flexBasis: "45%" }}>
            <Typography
              sx={{
                fontSize: "16px",
                color: "primary.dark",
                flexBasis: "100%",
                fontWeight: "500",
                margin: "0 0 12px",
                textTransform: "capitalize",
              }}
            >
              {t("profileBlock.nationality.nationality")}
            </Typography>
            <Autocomplete
              id="country-select"
              sx={{
                display: "inline-block",
                width: "100%",
                bgcolor: "primary.main",
              }}
              isOptionEqualToValue={isOptionEqualToValue}
              options={countries}
              onChange={(e: any, newValue: any) => {
                handleNationalityChange(newValue);
              }}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{
                    padding: "1px 10px",
                    borderRadius: "5px",
                    bgcolor:
                      data?.nationality === option.label
                        ? "background.paper"
                        : "primary.main",
                    color:
                      data?.nationality === option.label
                        ? "secondary.main"
                        : "primary.contrastText",
                    "& > img": { mr: 2, flexShrink: 0 },
                    "&:hover": {
                      bgcolor: "background.paper",
                      color: "secondary.main",
                    },
                  }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt={`${option.label}`}
                  />
                  {option.label}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={user?.nationality?.label || "Nationality"}
                  sx={{
                    borderRadius: "4px",
                    height: "48px",
                    padding: "0",
                    display: "flex",
                    justifyContent: "center",
                    boxShadow: "0 1px 4px 0 rgba(0,0,0,.12)",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </Grid>
          {/* Introduction input */}
          <Grid item container sx={{ flexBasis: "100%", margin: "16px 0 0" }}>
            <Typography
              sx={{
                fontSize: "16px",
                color: "primary.dark",
                flexBasis: "100%",
                fontWeight: "500",
                margin: "0 0 12px",
                textTransform: "capitalize",
              }}
            >
              {t("profileBlock.introduction.introduction")}
            </Typography>
            <TextareaAutosize
              aria-label={"Introduction"}
              name="about"
              minRows={3}
              placeholder={t("profileBlock.introduction.plholder")}
              onChange={handleDataChange}
              style={{
                width: "100%",
                padding: "20px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

interface CountryType {
  label: string;
  code: string;
  suggested?: boolean;
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries: readonly CountryType[] = [
  { code: "AD", label: "Andorra" },
  {
    code: "AE",
    label: "United Arab Emirates",
  },
  { code: "AF", label: "Afghanistan" },
  {
    code: "AG",
    label: "Antigua and Barbuda",
  },
  { code: "AI", label: "Anguilla" },
  { code: "AL", label: "Albania" },
  { code: "AM", label: "Armenia" },
  { code: "AO", label: "Angola" },
  { code: "AQ", label: "Antarctica" },
  { code: "AR", label: "Argentina" },
  { code: "AS", label: "American Samoa" },
  { code: "AT", label: "Austria" },
  {
    code: "AU",
    label: "Australia",

    suggested: true,
  },
  { code: "AW", label: "Aruba" },
  { code: "AX", label: "Alland Islands" },
  { code: "AZ", label: "Azerbaijan" },
  {
    code: "BA",
    label: "Bosnia and Herzegovina",
  },
  { code: "BB", label: "Barbados" },
  { code: "BD", label: "Bangladesh" },
  { code: "BE", label: "Belgium" },
  { code: "BF", label: "Burkina Faso" },
  { code: "BG", label: "Bulgaria" },
  { code: "BH", label: "Bahrain" },
  { code: "BI", label: "Burundi" },
  { code: "BJ", label: "Benin" },
  { code: "BL", label: "Saint Barthelemy" },
  { code: "BM", label: "Bermuda" },
  { code: "BN", label: "Brunei Darussalam" },
  { code: "BO", label: "Bolivia" },
  { code: "BR", label: "Brazil" },
  { code: "BS", label: "Bahamas" },
  { code: "BT", label: "Bhutan" },
  { code: "BV", label: "Bouvet Island" },
  { code: "BW", label: "Botswana" },
  { code: "BY", label: "Belarus" },
  { code: "BZ", label: "Belize" },
  {
    code: "CA",
    label: "Canada",

    suggested: true,
  },
  {
    code: "CC",
    label: "Cocos (Keeling) Islands",
  },
  {
    code: "CD",
    label: "Congo, Democratic Republic of the",
  },
  {
    code: "CF",
    label: "Central African Republic",
  },
  {
    code: "CG",
    label: "Congo, Republic of the",
  },
  { code: "CH", label: "Switzerland" },
  { code: "CI", label: "Cote d'Ivoire" },
  { code: "CK", label: "Cook Islands" },
  { code: "CL", label: "Chile" },
  { code: "CM", label: "Cameroon" },
  { code: "CN", label: "China" },
  { code: "CO", label: "Colombia" },
  { code: "CR", label: "Costa Rica" },
  { code: "CU", label: "Cuba" },
  { code: "CV", label: "Cape Verde" },
  { code: "CW", label: "Curacao" },
  { code: "CX", label: "Christmas Island" },
  { code: "CY", label: "Cyprus" },
  { code: "CZ", label: "Czech Republic" },
  {
    code: "DE",
    label: "Germany",

    suggested: true,
  },
  { code: "DJ", label: "Djibouti" },
  { code: "DK", label: "Denmark" },
  { code: "DM", label: "Dominica" },
  {
    code: "DO",
    label: "Dominican Republic",
  },
  { code: "DZ", label: "Algeria" },
  { code: "EC", label: "Ecuador" },
  { code: "EE", label: "Estonia" },
  { code: "EG", label: "Egypt" },
  { code: "EH", label: "Western Sahara" },
  { code: "ER", label: "Eritrea" },
  { code: "ES", label: "Spain" },
  { code: "ET", label: "Ethiopia" },
  { code: "FI", label: "Finland" },
  { code: "FJ", label: "Fiji" },
  {
    code: "FK",
    label: "Falkland Islands (Malvinas)",
  },
  {
    code: "FM",
    label: "Micronesia, Federated States of",
  },
  { code: "FO", label: "Faroe Islands" },
  {
    code: "FR",
    label: "France",

    suggested: true,
  },
  { code: "GA", label: "Gabon" },
  { code: "GB", label: "United Kingdom" },
  { code: "GD", label: "Grenada" },
  { code: "GE", label: "Georgia" },
  { code: "GF", label: "French Guiana" },
  { code: "GG", label: "Guernsey" },
  { code: "GH", label: "Ghana" },
  { code: "GI", label: "Gibraltar" },
  { code: "GL", label: "Greenland" },
  { code: "GM", label: "Gambia" },
  { code: "GN", label: "Guinea" },
  { code: "GP", label: "Guadeloupe" },
  { code: "GQ", label: "Equatorial Guinea" },
  { code: "GR", label: "Greece" },
  {
    code: "GS",
    label: "South Georgia and the South Sandwich Islands",
  },
  { code: "GT", label: "Guatemala" },
  { code: "GU", label: "Guam" },
  { code: "GW", label: "Guinea-Bissau" },
  { code: "GY", label: "Guyana" },
  { code: "HK", label: "Hong Kong" },
  {
    code: "HM",
    label: "Heard Island and McDonald Islands",
  },
  { code: "HN", label: "Honduras" },
  { code: "HR", label: "Croatia" },
  { code: "HT", label: "Haiti" },
  { code: "HU", label: "Hungary" },
  { code: "ID", label: "Indonesia" },
  { code: "IE", label: "Ireland" },
  { code: "IL", label: "Israel" },
  { code: "IM", label: "Isle of Man" },
  { code: "IN", label: "India" },
  {
    code: "IO",
    label: "British Indian Ocean Territory",
  },
  { code: "IQ", label: "Iraq" },
  {
    code: "IR",
    label: "Iran, Islamic Republic of",
  },
  { code: "IS", label: "Iceland" },
  { code: "IT", label: "Italy" },
  { code: "JE", label: "Jersey" },
  { code: "JM", label: "Jamaica" },
  { code: "JO", label: "Jordan" },
  {
    code: "JP",
    label: "Japan",

    suggested: true,
  },
  { code: "KE", label: "Kenya" },
  { code: "KG", label: "Kyrgyzstan" },
  { code: "KH", label: "Cambodia" },
  { code: "KI", label: "Kiribati" },
  { code: "KM", label: "Comoros" },
  {
    code: "KN",
    label: "Saint Kitts and Nevis",
  },
  {
    code: "KP",
    label: "Korea, Democratic People's Republic of",
  },
  { code: "KR", label: "Korea, Republic of" },
  { code: "KW", label: "Kuwait" },
  { code: "KY", label: "Cayman Islands" },
  { code: "KZ", label: "Kazakhstan" },
  {
    code: "LA",
    label: "Lao People's Democratic Republic",
  },
  { code: "LB", label: "Lebanon" },
  { code: "LC", label: "Saint Lucia" },
  { code: "LI", label: "Liechtenstein" },
  { code: "LK", label: "Sri Lanka" },
  { code: "LR", label: "Liberia" },
  { code: "LS", label: "Lesotho" },
  { code: "LT", label: "Lithuania" },
  { code: "LU", label: "Luxembourg" },
  { code: "LV", label: "Latvia" },
  { code: "LY", label: "Libya" },
  { code: "MA", label: "Morocco" },
  { code: "MC", label: "Monaco" },
  {
    code: "MD",
    label: "Moldova, Republic of",
  },
  { code: "ME", label: "Montenegro" },
  {
    code: "MF",
    label: "Saint Martin (French part)",
  },
  { code: "MG", label: "Madagascar" },
  { code: "MH", label: "Marshall Islands" },
  {
    code: "MK",
    label: "Macedonia, the Former Yugoslav Republic of",
  },
  { code: "ML", label: "Mali" },
  { code: "MM", label: "Myanmar" },
  { code: "MN", label: "Mongolia" },
  { code: "MO", label: "Macao" },
  {
    code: "MP",
    label: "Northern Mariana Islands",
  },
  { code: "MQ", label: "Martinique" },
  { code: "MR", label: "Mauritania" },
  { code: "MS", label: "Montserrat" },
  { code: "MT", label: "Malta" },
  { code: "MU", label: "Mauritius" },
  { code: "MV", label: "Maldives" },
  { code: "MW", label: "Malawi" },
  { code: "MX", label: "Mexico" },
  { code: "MY", label: "Malaysia" },
  { code: "MZ", label: "Mozambique" },
  { code: "NA", label: "Namibia" },
  { code: "NC", label: "New Caledonia" },
  { code: "NE", label: "Niger" },
  { code: "NF", label: "Norfolk Island" },
  { code: "NG", label: "Nigeria" },
  { code: "NI", label: "Nicaragua" },
  { code: "NL", label: "Netherlands" },
  { code: "NO", label: "Norway" },
  { code: "NP", label: "Nepal" },
  { code: "NR", label: "Nauru" },
  { code: "NU", label: "Niue" },
  { code: "NZ", label: "New Zealand" },
  { code: "OM", label: "Oman" },
  { code: "PA", label: "Panama" },
  { code: "PE", label: "Peru" },
  { code: "PF", label: "French Polynesia" },
  { code: "PG", label: "Papua New Guinea" },
  { code: "PH", label: "Philippines" },
  { code: "PK", label: "Pakistan" },
  { code: "PL", label: "Poland" },
  {
    code: "PM",
    label: "Saint Pierre and Miquelon",
  },
  { code: "PN", label: "Pitcairn" },
  { code: "PR", label: "Puerto Rico" },
  {
    code: "PS",
    label: "Palestine, State of",
  },
  { code: "PT", label: "Portugal" },
  { code: "PW", label: "Palau" },
  { code: "PY", label: "Paraguay" },
  { code: "QA", label: "Qatar" },
  { code: "RE", label: "Reunion" },
  { code: "RO", label: "Romania" },
  { code: "RS", label: "Serbia" },
  { code: "RU", label: "Russian Federation" },
  { code: "RW", label: "Rwanda" },
  { code: "SA", label: "Saudi Arabia" },
  { code: "SB", label: "Solomon Islands" },
  { code: "SC", label: "Seychelles" },
  { code: "SD", label: "Sudan" },
  { code: "SE", label: "Sweden" },
  { code: "SG", label: "Singapore" },
  { code: "SH", label: "Saint Helena" },
  { code: "SI", label: "Slovenia" },
  {
    code: "SJ",
    label: "Svalbard and Jan Mayen",
  },
  { code: "SK", label: "Slovakia" },
  { code: "SL", label: "Sierra Leone" },
  { code: "SM", label: "San Marino" },
  { code: "SN", label: "Senegal" },
  { code: "SO", label: "Somalia" },
  { code: "SR", label: "Suriname" },
  { code: "SS", label: "South Sudan" },
  {
    code: "ST",
    label: "Sao Tome and Principe",
  },
  { code: "SV", label: "El Salvador" },
  {
    code: "SX",
    label: "Sint Maarten (Dutch part)",
  },
  {
    code: "SY",
    label: "Syrian Arab Republic",
  },
  { code: "SZ", label: "Swaziland" },
  {
    code: "TC",
    label: "Turks and Caicos Islands",
  },
  { code: "TD", label: "Chad" },
  {
    code: "TF",
    label: "French Southern Territories",
  },
  { code: "TG", label: "Togo" },
  { code: "TH", label: "Thailand" },
  { code: "TJ", label: "Tajikistan" },
  { code: "TK", label: "Tokelau" },
  { code: "TL", label: "Timor-Leste" },
  { code: "TM", label: "Turkmenistan" },
  { code: "TN", label: "Tunisia" },
  { code: "TO", label: "Tonga" },
  { code: "TR", label: "Turkey" },
  {
    code: "TT",
    label: "Trinidad and Tobago",
  },
  { code: "TV", label: "Tuvalu" },
  {
    code: "TW",
    label: "Taiwan, Republic of China",
  },
  {
    code: "TZ",
    label: "United Republic of Tanzania",
  },
  { code: "UA", label: "Ukraine" },
  { code: "UG", label: "Uganda" },
  {
    code: "US",
    label: "United States",

    suggested: true,
  },
  { code: "UY", label: "Uruguay" },
  { code: "UZ", label: "Uzbekistan" },
  {
    code: "VA",
    label: "Holy See (Vatican City State)",
  },
  {
    code: "VC",
    label: "Saint Vincent and the Grenadines",
  },
  { code: "VE", label: "Venezuela" },
  {
    code: "VG",
    label: "British Virgin Islands",
  },
  {
    code: "VI",
    label: "US Virgin Islands",
  },
  { code: "VN", label: "Vietnam" },
  { code: "VU", label: "Vanuatu" },
  { code: "WF", label: "Wallis and Futuna" },
  { code: "WS", label: "Samoa" },
  { code: "XK", label: "Kosovo" },
  { code: "YE", label: "Yemen" },
  { code: "YT", label: "Mayotte" },
  { code: "ZA", label: "South Africa" },
  { code: "ZM", label: "Zambia" },
  { code: "ZW", label: "Zimbabwe" },
];
