import { Box } from "@mui/material";
import { DefaultInput, DefaultGroupedSwitch, DefaultRangeSlider } from "..";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeSearchingFilter } from "../../redux/actions/common";
import useTranslation from "next-translate/useTranslation";

export const LeftSortingSide: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchingFilter = useAppSelector((st) => st.searchingFilter);
  const { t } = useTranslation("common");

  const handleFilterChange = (e: React.ChangeEvent<unknown>) => {
    let target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    if (type === "checkbox") {
      if (checked) {
        let newJobType = [...searchingFilter.jobType, name];

        return dispatch(
          changeSearchingFilter({ ...searchingFilter, jobType: newJobType })
        );
      } else {
        let filteredArray = searchingFilter.jobType.filter(
          (el: string) => el !== name
        );

        return dispatch(
          changeSearchingFilter({ ...searchingFilter, jobType: filteredArray })
        );
      }
    }

    return dispatch(
      changeSearchingFilter({ ...searchingFilter, [name]: value })
    );
  };

  return (
    <Box
      sx={{
        flexBasis: { xs: "100%", md: "20%" },
        width: { xs: "90%", md: "100%" },
      }}
    >
      <DefaultInput
        inputName="location"
        plholder={`${t("sorting.location.plholder")}`}
        header={`${t("sorting.location.header")}`}
        ariaLabel={`${t("sorting.location.label")}`}
        propValue={searchingFilter?.location}
        after={<LocationOnOutlinedIcon sx={{ color: "primary.dark" }} />}
        handleChange={(e) => handleFilterChange(e)}
      />

      <DefaultInput
        inputName="keywords"
        plholder={`${t("sorting.keywords.plholder")}`}
        header={`${t("sorting.keywords.header")}`}
        ariaLabel={`${t("sorting.keywords.label")}`}
        propValue={searchingFilter?.keywords}
        handleChange={(e) => handleFilterChange(e)}
      />

      {/* TODO */}
      {/* <DefaultMultipleSelectCheckmarks
              plholder="All Categories"
              header="Category"
              dataToMap={searchingCategories}
              propHandleChange={function (e: any): void | null {
                throw new Error("Function not implemented.");
              }}
              selected={""}
            /> */}

      <DefaultGroupedSwitch
        header={`${t("sorting.jobType.header")}`}
        switches={[
          {
            name: "Full Time",
            value: searchingFilter?.jobType?.includes("Full Time"),
            label: `${t("sorting.jobType.labels.fullTime")}`,
          },
          {
            name: "Freelance",
            value: searchingFilter?.jobType?.includes("Freelance"),
            label: `${t("sorting.jobType.labels.freelance")}`,
          },
          {
            name: "Part Time",
            value: searchingFilter?.jobType?.includes("Part Time"),
            label: `${t("sorting.jobType.labels.partTime")}`,
          },
          {
            name: "Intership",
            value: searchingFilter?.jobType?.includes("Intership"),
            label: `${t("sorting.jobType.labels.intership")}`,
          },
          {
            name: "Temporary",
            value: searchingFilter?.jobType?.includes("Temporary"),
            label: `${t("sorting.jobType.labels.temporary")}`,
          },
        ]}
        propStyles={{ margin: "0 0 40px" }}
        propHandleChange={handleFilterChange}
      />

      <DefaultRangeSlider
        header={`${t("sorting.salary.header")}`}
        min={0}
        max={15000}
        step={100}
        valueDisplay={true}
        minValue={searchingFilter?.salary?.[0]}
        maxValue={searchingFilter?.salary?.[1]}
        headerPropStyles={{ margin: "0 0 45px" }}
        propHandleChange={(e) => handleFilterChange(e)}
        propName={`salary`}
      />
    </Box>
  );
};
