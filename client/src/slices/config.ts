import { createSlice } from "@reduxjs/toolkit";

export const ConfigSlice = createSlice({
	name: "Config",
	initialState: {
    domains: [] as any[],
    ads_types: [] as any[],
	},
	reducers: {
		setDomains: (state, { payload }) => {
			state.domains = payload;
		},
		setAdTypes: (state, { payload }) => {
			state.ads_types = payload;
		},
	},
});

export const ConfigActions = ConfigSlice.actions;
export default ConfigSlice.reducer;
