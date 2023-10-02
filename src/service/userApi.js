import { axiosClient } from "./axiosClient";

export const userApi = {
  LoginUserApi: (data) => {
    const url = "/auth/login";
    return axiosClient.post(url, data);
  },
  RegisterUserApi: (data) => {
    const url = "/users";
    return axiosClient.post(url, data);
  },
  GetAllUser: () => {
    const url = "/users";
    return axiosClient.get(url);
  },
  PostCart: (data) => {
    const url = "/carts";
    return axiosClient.post(url, data);
  },
};
