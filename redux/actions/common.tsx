import { ISettingsData } from "../../interfaces/common";

export const changeSearchingFilter = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: "CHANGE_SEARCHING_FILTER", payload: data });
  } catch (error) {
    console.log(`redux/actions/common/searchingFilter ${error}`);
  }
};

export const getIntoInfo = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: "GET_INTRO_INFO", payload: data });
  } catch (error) {
    console.log(`redux/actions/common/getIntoInfo ${error}`);
  }
};

export const changeSettingsData =
  (data: ISettingsData) => async (dispatch: any) => {
    try {
      dispatch({ type: "CHANGE_SETTINGS_DATA", payload: data });
    } catch (error) {
      console.log(`redux/actions/common/changeSettingsData ${error}`);
    }
  };
