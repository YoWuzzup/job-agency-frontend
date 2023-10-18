import { Grid, Typography } from "@mui/material";
import { IInfoAbout } from "../../../interfaces/common";

export const InfoAbout: React.FC<IInfoAbout> = ({ header, description }) => {
  return (
    <Grid container>
      <Grid
        item
        container
        sx={{ flexFlow: "column", margin: "65px 0", flexBasis: "95%" }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "primary.dark",
            fontSize: "20px",
            fontWeight: "300",
            margin: "0 0 25px",
            textTransform: "capitalize",
          }}
        >
          {header}
        </Typography>
        <Grid
          item
          sx={{
            fontSize: "16px",
            color: "primary.contrastText",
            lineHeight: "27px",
            textAlign: "justify",
          }}
        >
          {description}
        </Grid>
      </Grid>
    </Grid>
  );
};
