import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, useLocalStorage } from "../../hooks";

import {
  Footer,
  DefaultMultipleSelectCheckmarks,
  DefaultSwitch,
  SingleJob,
  Pagination,
  LeftSortingSide,
} from "../../components";

import GradeIcon from "@mui/icons-material/Grade";
import { Box, Typography } from "@mui/material";
import { fetchAllJobs } from "../../api/jobs";
import { changeSearchingFilter } from "../../redux/actions/common";
import {
  deleteBookmarks,
  postAddBookmarks,
  subscribeUser,
} from "../../api/users";
import { changeUser } from "../../redux/actions/user";

const searchingCategories = [
  "Accounting and Finance",
  "Clerical & Data Entry",
  "Counseling",
  "Court Administration",
  "Human Resources",
  "Investigative",
  "IT and Computers",
  "Law Enforcement",
  "Management",
  "Miscellaneous",
  "Public Relations",
];

const checkingIfUserHasJob = (jobBookmarks: [], jobId: string) => {
  return jobBookmarks.some((obj: any) => obj._id === jobId);
};

const sortingCategories = () => {
  const { t } = useTranslation("common");

  return [
    { label: `${t("sorting.topPannel.newest")}`, value: "Newest" },
    { label: `${t("sorting.topPannel.oldest")}`, value: "Oldest" },
  ];
};

const TopPannel: React.FC = () => {
  const [isSubed, setIsSubed] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const searchingFilter = useAppSelector((st) => st.searchingFilter);
  const user = useAppSelector((st) => st.user);
  const { t } = useTranslation("common");

  const handleFilterChange = (e: React.ChangeEvent<unknown>) => {
    let target = e.target as HTMLInputElement;
    const { value } = target;

    dispatch(changeSearchingFilter({ ...searchingFilter, sort: value }));
  };

  const handleSubscription = async (e: any) => {
    e.preventDefault();

    // 'cuz it's async
    const newVal = !isSubed;
    setIsSubed(newVal);

    await subscribeUser({
      id: user._id,
      value: newVal,
      email: user.email || "",
      subType: "jobs",
      alertsQuery: newVal ? searchingFilter : null,
    }).then((res) => dispatch(changeUser(user, res?.data)));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: { xs: "column", md: "row nowrap" },
        justifyContent: "space-between",
        height: { xs: "auto", md: "59px" },
        margin: "0 0 35px",
        bgcolor: { xs: "none", md: "background.paper" },
        "& .MuiFormControlLabel-root ": {
          bgcolor: { xs: "background.paper", md: "none" },
          padding: "15px 25px",
          margin: { xs: "0 0 25px", md: "0" },
        },
      }}
    >
      <DefaultSwitch
        checked={isSubed}
        label={`${t("sorting.topPannel.turnOnEmail")}`}
        propHandleChange={handleSubscription}
        propName={"turnOnEmail"}
      />

      <DefaultMultipleSelectCheckmarks
        plholder={`${t("sorting.topPannel.all")}`}
        header=""
        dataToMap={sortingCategories()}
        propStyles={{
          flexBasis: { xs: "100%", md: "30%" },
          width: "100%",
          margin: "0",
          textTransform: "capitalize",
        }}
        propHandleChange={(e) => handleFilterChange(e)}
        selected={searchingFilter?.sort}
      />
    </Box>
  );
};

const Jobs: NextPage = () => {
  const dispatch = useAppDispatch();
  const jobs: object[] = useAppSelector((st) => st.jobs);
  const user = useAppSelector((st) => st.user);
  const [userLocalStorage, setUserLocalStorage] = useLocalStorage("user", null);
  const searchingFilter = useAppSelector((st) => st.searchingFilter);
  const { t } = useTranslation("common");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalNumberOfDocs, setTotalNumberOfDocs] = useState<number>(10);

  const handleAfterAddClick = async (jobData: any) => {
    await postAddBookmarks({
      itemId: jobData?._id,
      userId: user?._id,
      userEmail: user?.email,
      type: "jobs",
      dispatch,
      setUserLocalStorage,
    });
  };

  const handleAfterDeleteClick = async (jobData: any) => {
    await deleteBookmarks({
      itemId: jobData?._id,
      userId: user?._id,
      userEmail: user?.email,
      type: "jobs",
      dispatch,
      setUserLocalStorage,
    });
  };

  const handlePaginationChange = (
    e: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPageNumber(page);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const delay = 500;

    timer = setTimeout(() => {
      const fetchData = async () => {
        try {
          fetchAllJobs(
            { ...searchingFilter, page: pageNumber },
            dispatch,
            setTotalNumberOfDocs
          );
        } catch (error) {
          console.log(`something wrong companies/index/useEffect ${error}`);
        }
      };
      fetchData();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [searchingFilter, pageNumber]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "background.default",
          margin: "81px 0 0",
        }}
      >
        <Box
          sx={{
            padding: "90px 0 0",
            margin: { xs: "0", sm: "0 auto" },
            width: { xs: "100%", sm: "75%" },
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "center", md: "flex-start" },
            flexFlow: { xs: "column", md: "row nowrap" },
            gap: "3%",
          }}
        >
          {/* left side with sorting */}
          <LeftSortingSide />

          {/* right side with search results */}
          <Box
            sx={{
              flexBasis: "70%",
              display: "flex",
              flexFlow: "column",
              alignItems: "stretch",
              justifyContent: "center",
              width: { xs: "90%", md: "100%" },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "20px",
                fontWeight: "300",
                margin: "0 0 15px",
              }}
            >
              {`${t("sorting.topPannel.results")}`}
            </Typography>

            {/* top pannel with subscribtion and sorting */}
            <TopPannel />

            {jobs?.map((job: any, index: number) => (
              <SingleJob
                job={job}
                translation={`${t("buttons.applyNow")}`}
                key={`${job.timePublished}_${index}`}
                after={
                  user ? (
                    <Box
                      className=""
                      sx={{
                        width: "39px",
                        height: "39px",
                        margin: "0 10px 0 0",
                        border: "1px solid",
                        borderColor: checkingIfUserHasJob(
                          user.bookmarks.jobs || [],
                          job._id
                        )
                          ? "gold"
                          : "#00e2bd",
                        borderRadius: "50%",
                        display: "flex",
                        zIndex: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "all ease .3s",
                        "&:hover": {
                          bgcolor: checkingIfUserHasJob(
                            user.bookmarks.jobs || [],
                            job._id
                          )
                            ? "#e9df0b"
                            : "#00e2bd",
                          "& .favIcon": {
                            color: "primary.main",
                          },
                        },
                      }}
                      data-func={true}
                    >
                      <GradeIcon
                        sx={{
                          color: checkingIfUserHasJob(
                            user.bookmarks.jobs || [],
                            job._id
                          )
                            ? "gold"
                            : "#00e2bd",
                          "& path": { maxWidth: 0, maxHeight: 0 },
                        }}
                        className="favIcon addFavourite"
                        data-func={true}
                      />
                    </Box>
                  ) : null
                }
                handleClickForAfter={() => {
                  checkingIfUserHasJob(user.bookmarks.jobs || [], job._id)
                    ? handleAfterDeleteClick(job)
                    : handleAfterAddClick(job);
                }}
              />
            ))}

            {/* pagination */}
            {jobs?.length >= 10 && (
              <Pagination
                count={Math.ceil(totalNumberOfDocs / 10)}
                page={pageNumber}
                onChange={handlePaginationChange}
              />
            )}
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default Jobs;
