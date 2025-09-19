import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { fetchUsers } from "./ActionCreators";

interface UserSlice {
  users: IUser[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserSlice = {
  users: [],
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    build.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message ?? null;
    });
  },
});

export default userSlice.reducer;
