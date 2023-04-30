import { createSlice } from "@reduxjs/toolkit";

export const UISlice = createSlice({
	name: "UI",
	initialState: {
		colorScheme: localStorage.getItem("mantine-color-scheme") as any,
	},
	reducers: {
		setColorScheme: (state, { payload }) => {
			state.colorScheme = payload;
			localStorage.setItem("mantine-color-scheme", payload);
		},
	},
});

export const UIActions = UISlice.actions;
export default UISlice.reducer;
