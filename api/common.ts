import axios from "axios";
import { getIntoInfo } from "../redux/actions/common";

const url = process.env.NEXT_PUBLIC_URL;

export const fetchIntoInfo = async (dispatch: any) => {
  try {
    return axios.get(`${url}companies/introInfo`).then((res) => {
      dispatch(getIntoInfo(res?.data));
    });
  } catch (error) {
    console.log(`api/common: fetchIntroInfo`);
  }
};
