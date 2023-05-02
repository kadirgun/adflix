import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./types";

export const UserSlice = createSlice({
	name: "User",
	initialState: {
		auth: {
			access_token: "",
		},
		isLoggedin: false,
	} as IUser,
	reducers: {
		setAccessToken: (state, { payload }) => {
			state.auth.access_token = payload;
		},
		setLoggedin: (state, { payload }) => {
			state.isLoggedin = payload;
		},
		destroyAuth: (state) => {
			delete state.auth.access_token;
		},
	},
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;
