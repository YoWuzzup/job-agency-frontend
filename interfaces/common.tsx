import { StaticImageData } from "next/image";

export interface ISingleJob {
  job: {
    position: string;
    company: string;
    avatar: string;
    city: string;
    job_type: string[];
    posted: Date;
    _id: string;
  };
  translation?: string;
  hovered?: boolean;
  after?: React.ReactNode;
  handleClickForAfter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  propStyles?: {};
  propClassNames?: string;
}

export interface ISingleFreelancer {
  freelancer: {
    name: string;
    current_position: {
      position: string;
      start_date: string;
      rating: number;
      description: string;
      company_name: string;
      company_logo: string;
    };
    avatar: string;
    city: string;
    jobs_done: [{ employer: string; success: boolean }];
    rate: number;
    starRating: number[];
  };
  after?: React.ReactNode;
  propStyles?: {};
  propClassNames?: string;
  handleClick: (e: any) => void;
}

export interface IInfoHeader {
  bgImage: StaticImageData;
  after?: JSX.Element;
  type: "freelancer" | "company";
  info: {
    avatar: string;
    country: string;
    feedbacks: object[];
    currentPosition: any;
    fullName: string;
  };
}

export interface IInfoAbout {
  header: string;
  description: string | string[];
}

export interface ICustomizedBreadcrumbs {
  separator: string | JSX.Element;
  dataToMap: {
    linkTo: string;
    label: string;
    active?: boolean;
    onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void;
    icon?: JSX.Element;
    deleIcon?: JSX.Element;
    onDele?: (event: React.MouseEvent<Element, MouseEvent>) => void;
  }[];
}

export interface ISettingsData {
  email: string;
  accountType: "freelancer" | "employer";
  avatar: string;
  name: string;
  surname: string;
  skills: string[];
  rate: number;
  attachments: { cv: {}; contrant: {} };
  tagline: string;
  nationality: {};
  introduction: string;
}
