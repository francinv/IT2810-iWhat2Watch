import { createSlice } from "@reduxjs/toolkit";
import { IUserState } from "../../services/types"

const initialState: IUserState = {
  isLoggedIn: false,
  userName: undefined,
};

const UserSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loginAsUser(state, action) {
      state.isLoggedIn = true;
      state.userName = action.payload
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.userName = undefined;
    }
  },
});

export const { loginAsUser, logOut } = UserSlice.actions;
export default UserSlice.reducer;
