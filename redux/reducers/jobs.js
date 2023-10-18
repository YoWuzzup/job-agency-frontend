const initialState = { jobs: null, singleJob: null };

export const jobs = (jobs = initialState.jobs, action) => {
  switch (action.type) {
    case "GET_JOBS":
      return action.payload;
    default:
      return jobs;
  }
};

export const singleJob = (job = initialState.singleJob, action) => {
  switch (action.type) {
    case "GET_SINGLE_JOB":
      return action.payload;
    default:
      return job;
  }
};
