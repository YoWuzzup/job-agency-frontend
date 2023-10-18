const initialState = { companies: null };

export const companies = (companies = initialState.companies, action) => {
  switch (action.type) {
    case "GET_COMPANIES":
      return action.payload;
    default:
      return companies;
  }
};
