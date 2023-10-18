export const signinUser = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: "LOGIN_USER", payload: data });
  } catch (error) {
    console.log(`redux/actions/user/signin ${error}`);
  }
};

export const changeUser =
  (originalUser: any, newUser: any) => async (dispatch: any) => {
    try {
      dispatch({
        type: "CHANGE_USER",
        payload: { ...originalUser, ...newUser },
      });
    } catch (error) {
      console.log(`redux/actions/user/changeUser ${error}`);
    }
  };

export const signoutUser = (data: null) => async (dispatch: any) => {
  try {
    dispatch({ type: "LOGOUT_USER", payload: data });
  } catch (error) {
    console.log(`redux/actions/user/signout ${error}`);
  }
};

export const changeBookmarks = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: "CHANGE_BOOKMARKS", payload: data });
  } catch (error) {
    console.log(`redux/actions/user/changeBookmarks ${error}`);
  }
};
