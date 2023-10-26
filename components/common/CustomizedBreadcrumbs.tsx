import { useRouter } from "next/router";

import { styled } from "@mui/material/styles";
import { Breadcrumbs, Chip } from "@mui/material/";
import { ICustomizedBreadcrumbs } from "../../interfaces/common";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  return {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: "capitalize",
    fontSize: "14px",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
    "&:active": {},
  };
}) as typeof Chip;

export const CustomizedBreadcrumbs: React.FC<ICustomizedBreadcrumbs> = ({
  dataToMap,
  separator,
}) => {
  const router = useRouter();

  const handleClick = (
    e: React.MouseEvent<Element, MouseEvent>,
    label: string,
    linkTo: string
  ) => {
    e.preventDefault();
    let url = label === "home" ? "/" : linkTo;

    router.push(`${url}`);
  };

  return (
    <div role="presentation">
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={separator}
        sx={{
          padding: "7px",
          backgroundColor: "primary.dark",
          borderRadius: "5px",
          display: "flex",
        }}
      >
        {dataToMap.map((crumb, index) => {
          return (
            <StyledBreadcrumb
              component="a"
              href={`${crumb.linkTo}`}
              label={`${crumb.label}`}
              icon={crumb.icon}
              deleteIcon={crumb.deleIcon}
              onClick={(e: any) => handleClick(e, crumb.label, crumb.linkTo)}
              onDelete={crumb.onDele}
              key={`${crumb.label}_${index}`}
              disabled={crumb.active ? true : false}
            />
          );
        })}
      </Breadcrumbs>
    </div>
  );
};
