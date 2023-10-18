import { StaticImageData } from "next/image";

// home page
export { default as homePoster } from "./home/home-video-background-poster.jpg";
export { default as sectionBg } from "./home/section-background.jpg";
export { default as spLogo } from "./home/sponsorsLogos/logo-carousel-01.png";
export { default as hossain } from "./home/hossain.gif";

// jobs page
export { default as singleJob } from "./jobs/singleJob/single-job.jpg";

// freelancers
export { default as freelancer } from "./freelancers/single-freelancer.jpg";

// language pictures
import en from "./languages/gb.png";
import pl from "./languages/pl.png";
import ru from "./languages/ru.png";

// the order should be as it is :)
export const flagImages: StaticImageData[] = [en, pl, ru];

// common images
export { default as logo2 } from "./logo2.png";
