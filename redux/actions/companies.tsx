export const getAllCompanies = (data: []) => async (dispatch: any) => {
  try {
    dispatch({ type: "GET_COMPANIES", payload: data });
  } catch (error) {
    console.log(`redux/actions/companies/getAllCompanies ${error}`);
  }
};
