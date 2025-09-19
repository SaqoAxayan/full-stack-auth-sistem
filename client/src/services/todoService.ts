import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITodo, ITodos } from "../models/ITodo";
import baseQueryWithToken from "./baseQueryWithRefresh";

export const todoAPI = createApi({
  reducerPath: "todoAPI",
  baseQuery: baseQueryWithToken,
  tagTypes: ["todo"],

  endpoints: (build) => ({
    getTodo: build.query<ITodos, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: (result) => ["todo"],
    }),
    fetchAddTodo: build.mutation<ITodos, ITodo>({
      query: (todo: ITodo) => ({
        url: "/addTodo",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["todo"],
    }),
    fetchDeleteTodo: build.mutation<ITodos, string>({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
    fetchCheckedTodo: build.mutation<ITodos, string>({
      query: (id: string) => ({
        url: `/checked/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["todo"],
    }),
    fetchDeleteAllTodo: build.mutation<ITodos, void>({
      query: () => ({
        url: "/deleteAll",
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
    fetchUpdateTodo: build.mutation<
      ITodos,
      { id: string; field: "title" | "description"; value: string }
    >({
      query: ({ id, field, value }) => ({
        url: `/update/${id}`,
        method: "PATCH",
        body: {
          [field]: value,
        },
      }),
      invalidatesTags: ["todo"],
    }),
  }),
});
