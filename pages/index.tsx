import type { NextPage } from "next";
import Head from "next/head";

import { useAppDispatch } from "../hooks";
import { useEffect } from "react";
import { fetchIntoInfo } from "../api/common";

import {
  Intro,
  RecentJobs,
  RecentBlogPosts,
  DividerBlock,
  SponsorCarousel,
  Footer,
} from "../components/index";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchIntoInfo(dispatch);
  });

  return (
    <>
      <Head>
        <title>JobMela</title>
        <meta name="description" content="JobMela home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Intro />
        <RecentJobs />
        <DividerBlock />
        <RecentBlogPosts />
        <SponsorCarousel />
      </main>
      <Footer />
    </>
  );
};

export default Home;
