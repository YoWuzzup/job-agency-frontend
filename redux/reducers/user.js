const initialState = {
  user: null,
};

export const user = (user = initialState.user, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...action.payload };
    case "LOGOUT_USER":
      return action.payload;
    case "CHANGE_USER":
      return { ...action.payload };
    case "CHANGE_BOOKMARKS":
      return { ...user, bookmarks: { ...action.payload } };
    default:
      return user;
  }
};
