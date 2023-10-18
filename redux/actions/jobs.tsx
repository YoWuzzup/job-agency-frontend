export const getAllJobs = (data: []) => async (dispatch: any) => {
  try {
    dispatch({ type: "GET_JOBS", payload: data });
  } catch (error) {
    console.log(`redux/actions/jobs/getAllJobs ${error}`);
  }
};

export const getSingleJob =
  (data: null | {} = null) =>
  async (dispatch: any) => {
    try {
      dispatch({ type: "GET_SINGLE_JOB", payload: data });
    } catch (error) {
      console.log(`redux/actions/jobs/getSingleJob ${error}`);
    }
  };
