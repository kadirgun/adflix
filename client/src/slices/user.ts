import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./types";

export const UserSlice = createSlice({
	name: "User",
	initialState: {
		auth: {},
		account: {},
	} as IUser,
	reducers: {
		setAccessToken: (state, { payload }) => {
			state.auth.access_token = payload;
		},
		destroyAuth: (state) => {
			delete state.auth.access_token;
		},
		setAccount: (state, { payload }) => {
			state.account = payload;
		},
	},
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;
