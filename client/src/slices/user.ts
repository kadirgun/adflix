import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./types";

export const UserSlice = createSlice({
	name: "User",
	initialState: {
		auth: {
			access_token: "",
			isLoggedin: false,
		},
		account: {}
	} as IUser,
	reducers: {
		setAccessToken: (state, { payload }) => {
			state.auth.access_token = payload;
			state.auth.isLoggedin = true;
		},
		destroyAuth: (state) => {
			delete state.auth.access_token;
			state.auth.isLoggedin = false;
		},
		setAccount: (state, { payload }) => {
			state.account = payload;
		},
	},
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;
