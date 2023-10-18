import { fetchSingleFreelancer } from "../../api/users";

export const getAllFreelancers = (data: []) => async (dispatch: any) => {
  try {
    dispatch({ type: "GET_FREELANCERS", payload: data });
  } catch (error) {
    console.log(`redux/actions/freelancers/getAllFreelancers ${error}`);
  }
};

export const getSingleFreelancer =
  (id: string | string[] | undefined) => async (dispatch: any) => {
    try {
      const res = await fetchSingleFreelancer(id);
      const data = res?.data[0] ?? {};

      dispatch({ type: "GET_SINGLE_FREELANCER", payload: data });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
