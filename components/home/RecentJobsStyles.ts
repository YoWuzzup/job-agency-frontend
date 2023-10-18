export const classes = {
  root: { margin: "0 auto", padding: "65px 0 75px", alignItems: "center" },
  top: {
    width: "80%",
    justifyContent: "space-between",
    margin: "0 auto 30px",
    flexFlow: { xs: "column", md: "row nowrap" },
  },
  header: {
    fontSize: 26,
    fontWeight: 500,
    color: "primary.dark",
    position: "relative",
    margin: { xs: "0 0 40px", md: 0 },
    bgcolor: "unset",
    "&:before": {
      content: "''",
      position: "absolute",
      width: "50px",
      height: "2px",
      bottom: 0,
      bgcolor: "secondary.main",
    },
  },
  itemsContainer: { width: "80%", margin: "0 auto", alignItems: "center" },
};
