import axios from "axios";
import { getAllCompanies } from "../redux/actions/companies";

const url = process.env.NEXT_PUBLIC_URL;

export const fetchAllCompanies = async (
  params: object,
  dispatch: any,
  setTotalNumberOfDocs: (e: any) => void
) => {
  try {
    return axios.get(`${url}companies/all`, { params }).then((res) => {
      dispatch(getAllCompanies(res?.data?.companies));
      setTotalNumberOfDocs(res?.data?.documentsLength);
    });
  } catch (error) {
    console.log(`api/companies: fetchAllCompanies ${error}`);
  }
};
