import { createSlice } from "@reduxjs/toolkit";

export const UISlice = createSlice({
	name: "UI",
	initialState: {
		colorScheme: undefined,
	},
	reducers: {
		setColorScheme: (state, { payload }) => {
			state.colorScheme = payload;
		},
	},
});

export const UIActions = UISlice.actions;
export default UISlice.reducer;
