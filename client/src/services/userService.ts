import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IApi, IUser } from "../models/IUser";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
    credentials: "include",
  }),
  endpoints: (build) => ({
    fetchRegistrationUser: build.mutation<IApi, IUser>({
      query: (userData: IUser) => ({
        url: "/registration",
        method: "POST",
        body: userData,
      }),
    }),
    fetchLoginUser: build.mutation<IApi, IUser>({
      query: (userData: IUser) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});
