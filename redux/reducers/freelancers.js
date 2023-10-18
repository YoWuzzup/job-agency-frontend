const initialState = {
  freelancers: null,
  singleFreelancer: null,
};

export const freelancers = (freelancers = initialState.freelancers, action) => {
  switch (action.type) {
    case "GET_FREELANCERS":
      return action.payload;
    default:
      return freelancers;
  }
};

export const singleFreelancer = (
  freelancer = initialState.singleFreelancer,
  action
) => {
  switch (action.type) {
    case "GET_SINGLE_FREELANCER":
      return action.payload;
    default:
      return { ...freelancer };
  }
};
