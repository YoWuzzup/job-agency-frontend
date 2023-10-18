import axios from "axios";

const url = process.env.NEXT_PUBLIC_URL;

export const postLogInData = async (data: {
  email: string;
  password: string;
}) => {
  try {
    return axios.post(`${url}auth/login`, data, { withCredentials: true });
  } catch (error) {
    console.log(`api/authentication/postLogInData error: ${error}`);
  }
};

export const postRegData = async (data: {
  email: string;
  password: string;
  confirmPassword: string;
  accountType: "freelancer" | "employer";
}) => {
  try {
    return axios.post(`${url}auth/registration`, data);
  } catch (error) {
    console.log(`api/authentication/postRegData error: ${error}`);
  }
};

export const postAuthDataGoogle = async (data: {}) => {
  try {
    return axios.post(`${url}auth/google`, data, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(`api - postAuthDataGoogle error: ${error}`);
  }
};

export const postSignout = async () => {
  try {
    return axios.post(
      `${url}auth/signout`,
      { data: "signout" },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(`api - postLogout error: ${error}`);
  }
};
