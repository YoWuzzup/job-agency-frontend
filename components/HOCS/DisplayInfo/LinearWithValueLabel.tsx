import LinearProgress, {
  LinearProgressProps,
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number; name: string }
) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexFlow: "row wrap",
        width: "100%",
      }}
    >
      <Box
        sx={{
          minWidth: 35,
          flexBasis: "100%",
          margin: "0 0 10px",
        }}
      >
        <Typography color="primary.dark">{`${props.value}%`}</Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1, flexBasis: "100%" }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            backgroundColor: "background.paper",
            [`& .${linearProgressClasses.bar}`]: {
              backgroundColor: "background.main",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          minWidth: 35,
          flexBasis: "100%",
          margin: "0 0 10px",
        }}
      >
        <Typography
          color="primary.contrastText"
          sx={{ fontSize: "16px", textTransform: "capitalize" }}
        >
          {props.name}
        </Typography>
      </Box>
    </Box>
  );
}

export const LinearWithValueLabel = ({
  value,
  name,
}: {
  value: number;
  name: string;
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={value} name={name} />
    </Box>
  );
};
