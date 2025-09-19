import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../models/IUser";

interface ErrorResponse {
  message: string;
}

export const fetchUsers = createAsyncThunk<
  IUser[],
  void,
  { rejectValue: ErrorResponse }
>("user/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<IUser[]>(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  } catch (err) {
    return rejectWithValue({ message: (err as Error).message });
  }
});
