import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "./types";

export const UserSlice = createSlice({
	name: "User",
	initialState: {
		auth: {
			access_token: localStorage.getItem("access_token") || "",
		},
	} as IUser,
	reducers: {
		setAccessToken: (state, { payload }) => {
			state.auth.access_token = payload;
			if (payload.token) {
				localStorage.setItem("access_token", payload.token);
			}
		},
		destroyAuth: (state) => {
			delete state.auth.access_token;
			localStorage.removeItem("access_token");
		},
	},
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;
