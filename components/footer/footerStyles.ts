export const classes = {
  footer: {
    width: "100%",
    backgroundColor: "#303030",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0",
    padding: "0",
  },
  footer_inner: {
    color: "common.white",
    width: { xs: "95%", md: "80%" },
    margin: "0",
    padding: "40px 0",
    justifyContent: { xs: "center", md: "space-between" },
    alignItems: "center",
    flexFlow: "row wrap",
  },
  //   top: logo image and social media links
  footer_top: {
    display: "flex",
    justifyContent: "space-between",
    flexFlow: { xs: "column", md: "row nowrap" },
    alignItems: { xs: "flex-start", md: "center" },
    flexBasis: "100%",
    height: "96px",
    margin: "0 0 60px 0",
  },
  top_logo: {
    height: "100%",
    flexBasis: "70%",
    borderRight: { xs: "none", md: "1px solid #484848" },
    margin: { xs: "0 0 20px 0", md: "0" },
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  top_socialMediaLinksContainer: {
    display: "flex",
    justifyContent: { xs: "flex-start" },
    alignItems: "center",
    flexFlow: "row nowrap",
    flexBasis: { xs: "100%", md: "25%" },
    padding: { xs: "0", md: "0 40px" },
    height: "100%",
    "& .top_links": {
      backgroundColor: "background.main",
      color: "primary.main",
      opacity: 0.5,
      cursor: "pointer",
      margin: "0 7px 0 0",
      "&:hover": {
        opacity: 1,
      },
    },
  },
  top_links: {
    width: "40px",
    height: "40px",
  },

  //   main list links for everything
  footer_links: {
    flexBasis: { xs: "95%", md: "100%", lg: "71%" },
    justifyContent: "space-between",
    alignItems: { xs: "center", md: "flex-start" },
    flexFlow: { xs: "column", sm: "row wrap", md: "row nowrap" },
    gap: "3%",
  },
  links_blocks: {
    flexFlow: "column",
    "& .main_links": {
      "&:hover": {
        padding: "0 0 0 5px",
        color: "#fff !important",
      },
    },
  },
  link: {
    margin: "4px 0",
    fontSize: "16px",
    color: "secondary.text",
    transition: "all ease .3s",
  },

  //   signup form
  footer_signup: {
    flexBasis: { xs: "100%", lg: "29%" },
    flexFlow: "column",
    margin: { xs: "45px 0 0", lg: "0" },
  },
  signup_header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: "0 0 15px",
    fontSize: "18px",
    textTransform: "capitalize",
  },
  subheader: {
    fontSize: "16px",
    color: "secondary.text",
    margin: "0 0 16px",
  },
  signup_form: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    background: "none",
  },
  signup_input: {
    height: "48px",
    width: { xs: "75%", sm: "90%", lg: "80%" },
    bgcolor: "#262626",
    borderRadius: "5px",
    color: "#756e61",
    padding: "0 20px",
  },
  signup_btn: {
    width: "48px",
    height: "48px",
    borderRadius: "5px",
    "&:hover": {
      color: "primary.dark",
      bgcolor: "background.default",
    },
  },
};
