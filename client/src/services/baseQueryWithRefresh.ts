import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/todo",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
});

const baseQueryWithToken = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshResult: any = await fetchBaseQuery({
      baseUrl: "http://localhost:3001/api",
      credentials: "include",
    })({ url: "/refresh", method: "GET" }, api, extraOptions);

    if (refreshResult.data) {
      
      localStorage.setItem("token", refreshResult.data.accessToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch({ type: "/api/logout" });
    }
  }
  return result;
};

export default baseQueryWithToken;
