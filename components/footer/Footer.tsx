import React, { memo, useState } from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

// styles
import { classes } from "./footerStyles";
import { commonClasses } from "../../styles/commonStyles";
// icons
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookOutlinedIcon from "@mui/icons-material/FaceOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Grid, InputBase, Paper, Tooltip, Typography } from "@mui/material/";
import { logo2 } from "../../public/index";

import { DefaultButton } from "../HOCS/DefaultInputs/DefaultButton";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { subscribeUser } from "../../api/users";
import { changeUser } from "../../redux/actions/user";

const socialMediaLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/yowuzzupla/",
    icon: <InstagramIcon color="primary" />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/yowuzzup/",
    icon: <LinkedInIcon color="primary" />,
  },

  {
    name: "Facebook",
    url: "https://www.facebook.com/YoWuzzupLA",
    icon: <FacebookOutlinedIcon color="primary" />,
  },
];

const links = (): any => {
  const { t } = useTranslation("common");
  const user = useAppSelector((st) => st.user);

  return [
    {
      title: `${t(`footer.first.title`)}`,
      links: [
        { name: `${t(`footer.first.links.jobs`)}`, url: "/jobs" },
        {
          name: `${t(`footer.first.links.settings`)}`,
          url: "/dashboard/settings",
        },
        {
          name: `${t(`footer.first.links.bookmarks`)}`,
          url: "/dashboard/bookmarks",
        },
      ],
    },
    {
      title: `${t(`footer.second.title`)}`,
      links: [
        { name: `${t(`footer.second.links.candidates`)}`, url: "/freelancers" },
        { name: `${t(`footer.second.links.postJob`)}`, url: "/job" },
      ],
    },
    {
      title: `${t(`footer.third.title`)}`,
      links: [{ name: `${t(`footer.third.links.contact`)}`, url: "/contact" }],
    },
    {
      title: `${t(`footer.fourth.title`)}`,
      links: [
        { name: `${t(`footer.fourth.links.account`)}`, url: "/dashboard" },
        !user && {
          name: `${t(`footer.fourth.links.logIn`)}`,
          url: "/auth/login",
        },
      ],
    },
  ];
};

const MemoizedForm: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((st) => st.user);
  const [email, setEmail] = useState<string>("");

  const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    await subscribeUser({
      id: user._id,
      value: true,
      email,
      subType: "news",
    }).then((res) => dispatch(changeUser(user, res?.data)));
  };

  return (
    <Paper component="form" elevation={0} sx={classes.signup_form}>
      <InputBase
        sx={classes.signup_input}
        placeholder={`Enter your email address`}
        inputProps={{ "aria-label": "email address" }}
        onChange={(e) => setEmail(e.target.value)}
      />

      <DefaultButton
        text={``}
        propStyles={classes.signup_btn}
        handleClick={handleClick}
        after={
          <ArrowRightAltIcon
            sx={{
              margin: "0",
            }}
          />
        }
        inputName={"signup_btn"}
      />
    </Paper>
  );
});

export const MyFooter: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <footer style={classes.footer}>
      <Grid container sx={classes.footer_inner}>
        {/* top: logo image and social media links */}
        <Grid item sx={classes.footer_top}>
          <Grid item sx={classes.top_logo}>
            <img src={logo2.src} alt="logo" />
          </Grid>
          <Grid item container sx={classes.top_socialMediaLinksContainer}>
            {socialMediaLinks.map((link, index) => {
              return (
                <Tooltip title={`${link.name}`} key={`${link.name}_${index}`}>
                  <a
                    // styles are in container classes.top_socialMediaLinks
                    style={{
                      ...commonClasses.button,
                      ...classes.top_links,
                    }}
                    href={`${link.url}`}
                    target="_blank"
                    className="top_links"
                    rel="noreferrer external noopener"
                  >
                    {link.icon}
                  </a>
                </Tooltip>
              );
            })}
          </Grid>
        </Grid>

        {/* middle block with links */}
        <Grid item container sx={classes.footer_links}>
          {links().map((block: any, index: number) => {
            return (
              <Grid
                item
                container
                key={`${block.title}_${index}`}
                sx={classes.links_blocks}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: "18px",
                    margin: { xs: "45px 0 15px 0", md: "0 0 15px 0" },
                    textTransform: "capitalize",
                    lineHeight: "1rem",
                  }}
                >
                  {block.title}
                </Typography>
                {block.links.map((link: any, i: number) => {
                  return (
                    <Link href={`${link?.url}`} key={`${link?.name}_${i}`}>
                      {/* for hover in classes.links_blocks */}
                      <a
                        style={{ ...classes.link, textTransform: "capitalize" }}
                        className="main_links"
                      >
                        {link?.name}
                      </a>
                    </Link>
                  );
                })}
              </Grid>
            );
          })}
        </Grid>

        {/* signup form */}
        <Grid item sx={classes.footer_signup}>
          <Typography variant="h5" sx={classes.signup_header}>
            <MailOutlinedIcon fontSize="medium" sx={{ margin: "0 10px 0 0" }} />
            {`${t("footer.newsletterForm.header")}`}
          </Typography>
          <Typography variant="body1" sx={classes.subheader}>
            {`${t("footer.newsletterForm.subHeader")}`}
          </Typography>

          <MemoizedForm />
        </Grid>
      </Grid>
    </footer>
  );
};

const Footer = memo(MyFooter);
export { Footer };
