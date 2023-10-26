import axios from "axios";
import { getAllJobs, getSingleJob } from "../redux/actions/jobs";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchAllJobs = async (
  params: object,
  dispatch: any,
  setTotalNumberOfDocs: (e: any) => void
) => {
  try {
    return axios.get(`${url}companies/getAllJobs`, { params }).then((res) => {
      dispatch(getAllJobs(res?.data?.jobs));
      setTotalNumberOfDocs(res?.data?.documentsLength);
    });
  } catch (error) {
    console.log(`api/jobs: fetchAllJobs ${error}`);
  }
};

export const fetchSingleJob = async (
  id: string | string[] | undefined,
  dispatch: any
) => {
  try {
    return axios.get(`${url}companies/jobs/${id}`).then((res) => {
      dispatch(getSingleJob(res?.data));
    });
  } catch (error) {
    console.log(`api/jobs: fetchSingleJob ${error}`);
  }
};
