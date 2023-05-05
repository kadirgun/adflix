import { createSlice } from "@reduxjs/toolkit";
import { UIMessage } from "./types";

export const UISlice = createSlice({
	name: "UI",
	initialState: {
		colorScheme: undefined,
		isAuthLoading: true,
		message: {} as UIMessage
	},
	reducers: {
		setColorScheme: (state, { payload }) => {
			state.colorScheme = payload;
		},
		setAuthLoading: (state, { payload }) => {
			state.isAuthLoading = payload;
		},
		setMessage: (state, { payload }) => {
			state.message = payload;
		}
	},
});

export const UIActions = UISlice.actions;
export default UISlice.reducer;
