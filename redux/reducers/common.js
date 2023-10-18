const initialState = {
  info: null,
  searchingFilter: {
    location: "",
    keywords: "",
    jobType: [],
    salary: [0, 5000],
    sort: ["Newest"],
  },
  data: {},
};

export const searchingFilter = (
  filter = initialState.searchingFilter,
  action
) => {
  switch (action.type) {
    case "CHANGE_SEARCHING_FILTER":
      return { ...filter, ...action.payload };
    default:
      return filter;
  }
};

export const introInfo = (info = initialState.info, action) => {
  switch (action.type) {
    case "GET_INTRO_INFO":
      return action.payload;
    default:
      return info;
  }
};

export const settingsData = (data = initialState.data, action) => {
  switch (action.type) {
    case "CHANGE_SETTINGS_DATA":
      return { ...data, ...action.payload };
    default:
      return { ...data };
  }
};
