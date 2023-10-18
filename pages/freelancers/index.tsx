import type { NextPage } from "next";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

import { Box, Typography } from "@mui/material";
import {
  DefaultMultipleSelectCheckmarks,
  DefaultSwitch,
  Footer,
  LeftSortingSide,
  Pagination,
  SingleFreelancer,
} from "../../components";
import { useEffect, useMemo, useRef, useState } from "react";
import { fetchAllUsers, subscribeUser } from "../../api/users";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllFreelancers } from "../../redux/actions/freelancers";
import { changeSearchingFilter } from "../../redux/actions/common";
import { changeUser } from "../../redux/actions/user";

const sortingCategories = () => {
  const { t } = useTranslation("common");

  return [
    { label: `${t("sorting.topPannel.newest")}`, value: "Newest" },
    { label: `${t("sorting.topPannel.oldest")}`, value: "Oldest" },
  ];
};

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

const TopPannel: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isSubed, setIsSubed] = useState<boolean>(false);
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
      subType: "freelancers",
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
        }}
        propHandleChange={(e) => handleFilterChange(e)}
        selected={searchingFilter?.sort}
      />
    </Box>
  );
};

const Freelancers: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const freelancers: object[] = useAppSelector((state) => state.freelancers);
  const memoizedFreelancers: object[] = useMemo(
    () => freelancers,
    [freelancers]
  );
  const { t } = useTranslation("common");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalNumberOfDocs, setTotalNumberOfDocs] = useState<number>(10);
  const searchingFilter = useAppSelector((st) => st.searchingFilter);

  const handlePaginationChange = (
    e: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPageNumber(page);
  };

  const handleClick = (id: string) => {
    router.push(`freelancers/${id}`);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const delay = 500;

    timer = setTimeout(() => {
      const fetchData = async () => {
        try {
          fetchAllUsers({ ...searchingFilter, page: pageNumber }).then(
            (res) => {
              dispatch(getAllFreelancers(res?.data?.users));
              setTotalNumberOfDocs(res?.data?.documentsLength);
            }
          );
        } catch (error) {
          console.log(`something wrong freelancers/index/useEffect ${error}`);
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
              Search Results
            </Typography>

            {/* top pannel with subscribtion and sorting */}
            <TopPannel />

            {memoizedFreelancers?.map((freelancer: any, index: number) => (
              <SingleFreelancer
                freelancer={freelancer}
                handleClick={() => handleClick(freelancer._id)}
                key={index}
              />
            ))}

            {memoizedFreelancers?.length >= 10 && (
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

export default Freelancers;
