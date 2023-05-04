import { createSlice } from "@reduxjs/toolkit";

export const UISlice = createSlice({
	name: "UI",
	initialState: {
		colorScheme: undefined,
		isAuthLoading: true,
	},
	reducers: {
		setColorScheme: (state, { payload }) => {
			state.colorScheme = payload;
		},
		setAuthLoading: (state, { payload }) => {
			state.isAuthLoading = payload;
		},
	},
});

export const UIActions = UISlice.actions;
export default UISlice.reducer;
