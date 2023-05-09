import { createSlice } from "@reduxjs/toolkit";

export const ConfigSlice = createSlice({
	name: "Config",
	initialState: {
    domains: [] as any[],
    ad_categories: [] as any[],
	},
	reducers: {
		setDomains: (state, { payload }) => {
			state.domains = payload;
		},
		setAdCategories: (state, { payload }) => {
			state.ad_categories = payload;
		},
	},
});

export const ConfigActions = ConfigSlice.actions;
export default ConfigSlice.reducer;
