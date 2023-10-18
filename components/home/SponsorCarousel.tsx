import { Box } from "@mui/material";
import { ReactNode, memo, useCallback, useState } from "react";
import { useScreenSize } from "../../hooks/index";

import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { commonClasses } from "../../styles/commonStyles";

import { spLogo } from "../../public/index";

const dummy = [spLogo, spLogo, spLogo, spLogo, spLogo, spLogo];

const MemoizedNextArrow = memo((props: any) => {
  const { className, style, onClick } = props;
  const [hovered, sethovered] = useState(false);
  const handleHover = useCallback(() => sethovered(true), [hovered]);
  const handleHoverOut = useCallback(() => sethovered(false), [hovered]);

  return (
    <button
      className={className}
      style={{
        ...style,
        ...commonClasses.button,
        backgroundColor: hovered ? "#00e2bd" : "#333",
        right: "-80px",
      }}
      onClick={onClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverOut}
    >
      <ArrowForwardIosIcon
        sx={{ color: "white", width: "24px", height: "24px" }}
      />
    </button>
  );
});

const MemoizedPrevArrow = memo((props: any) => {
  const { className, style, onClick } = props;
  const [hovered, sethovered] = useState(false);
  const handleHover = useCallback(() => {
    sethovered(true);
  }, [hovered]);
  const handleHoverOut = useCallback(() => {
    sethovered(false);
  }, [hovered]);

  return (
    <button
      className={className}
      style={{
        ...style,
        ...commonClasses.button,
        backgroundColor: hovered ? "#00e2bd" : "#333",
        left: "-80px",
      }}
      onClick={onClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverOut}
    >
      <ArrowBackIosNewIcon
        sx={{ color: "white", width: "24px", height: "24px" }}
      />
    </button>
  );
});

export const SponsorCarousel: React.FC = () => {
  const { width } = useScreenSize();

  const settings = {
    dots: width <= 1360 ? true : false,
    arrows: width <= 1360 ? false : true,
    infinite: true,
    speed: 500,
    slidesToShow: width <= 770 ? 1 : width <= 990 ? 3 : 5,
    slidesToScroll: 1,
    autoplay: true,
    className: "slick_container",
    nextArrow: <MemoizedNextArrow />,
    prevArrow: <MemoizedPrevArrow />,

    appendDots: (dots: ReactNode) => (
      <div>
        <ul style={{ padding: "0" }}>{dots}</ul>
      </div>
    ),
    customPaging: (i: ReactNode) => (
      <div
        style={{
          width: "13px",
          height: "13px",
          color: "blue",
          border: "2px solid #C0C0C0",
          borderRadius: "50px",
        }}
      />
    ),
  };

  return (
    <Box
      sx={{
        width: "95%",
        height: "120px",
        margin: "45px auto",
        "& .slick_container": {
          width: "80%",
          margin: "0 auto",
        },
      }}
    >
      <Slider {...settings}>
        {dummy.map((item, i) => {
          return (
            <Box
              key={`${item}_${i}`}
              sx={{
                width: "230px",
                height: "120px",
                display: "flex !important",
                justifyContent: "center",
                alignItems: "center",
                outline: "none",
              }}
            >
              <img
                alt="sponsors"
                src={`${item.src}`}
                style={{
                  width: "138px",
                  height: "61px",
                  margin: "0",
                }}
              />
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
};
