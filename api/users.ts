import axios, { AxiosResponse } from "axios";
import { changeBookmarks } from "../redux/actions/user";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchAllUsers = async (params: object) => {
  try {
    return axios.get(`${url}user/all`, { params });
  } catch (error) {
    console.log(`api/users: fetchAllUsers ${error}`);
  }
};

export const postUserDataChange = async (id: string, data: object) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    return axios.post(`${url}user/${id}`, data, config);
  } catch (error) {
    console.log(`api/users: postUserDataChange ${error}`);
  }
};

export const subscribeUser = async (data: {
  id: string;
  value: boolean;
  email: string;
  subType: string;
  alertsQuery?: any;
}) => {
  try {
    return axios.post(`${url}user/subscriptions/${data.subType}`, data);
  } catch (error) {
    console.log(`api/users: subscribeUserToNews ${error}`);
  }
};

export const fetchSingleFreelancer = async (
  id: string | string[] | undefined
) => {
  try {
    return axios.get(`${url}user/${id}`);
  } catch (error) {
    console.error(`api/users: fetchSingleFreelancer ${error}`);
  }
};

export const fetchBookmarks = async (
  user: any,
  dispatch: any,
  setUserLocalStorage: any
): Promise<void> => {
  try {
    const response: AxiosResponse<any> = await axios.get(
      `${url}user/${user?._id}/bookmarks`
    );

    dispatch(changeBookmarks(response?.data));
    setUserLocalStorage({ ...user, bookmarks: response?.data });
  } catch (error) {
    console.log(`api/users: fetchBookmarks ${error}`);
  }
};

export const deleteBookmarks = async ({
  itemId,
  userId,
  userEmail,
  type,
  dispatch,
  setUserLocalStorage,
}: {
  itemId: string;
  userId: any;
  userEmail: string;
  type: "jobs" | "freelancers";
  dispatch: any;
  setUserLocalStorage: any;
}): Promise<void> => {
  try {
    const data: any = { itemId, userEmail, type };

    const response: AxiosResponse<any> = await axios.post(
      `${url}user/${userId}/bookmarks/delete`,
      data
    );

    dispatch(changeBookmarks(response?.data?.bookmarks));
    setUserLocalStorage({ ...response?.data });
  } catch (error) {
    console.log(`api/users: deleteBookmarked ${error}`);
  }
};

export const postAddBookmarks = async ({
  itemId,
  userId,
  userEmail,
  type,
  dispatch,
  setUserLocalStorage,
}: {
  itemId: string;
  userId: any;
  userEmail: string;
  type: "jobs" | "freelancers";
  dispatch: any;
  setUserLocalStorage: any;
}): Promise<void> => {
  try {
    const data = { itemId, userEmail, type };

    const response: AxiosResponse<any> = await axios.post(
      `${url}user/${userId}/bookmarks`,
      data
    );

    dispatch(changeBookmarks(response?.data?.bookmarks));
    setUserLocalStorage({ ...response?.data });
  } catch (error) {
    console.log(`api/users: postAddBookmarks ${error}`);
  }
};
