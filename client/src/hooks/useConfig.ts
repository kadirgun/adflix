import { useAppSelector } from "@/slices/store";
import { ConfigActions } from "@/slices/config";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const useConfig = () => {
	const config = useAppSelector((state) => state.config);
	const dispatch = useDispatch();

	const setDomains = useCallback(
		(domains: any) => {
			dispatch(ConfigActions.setDomains(domains));
		},
		[config.domains]
	);

	const setAdCategories = useCallback(
		(adTypes: any) => {
			dispatch(ConfigActions.setAdCategories(adTypes));
		},
		[config.ad_categories]
	);

	return {
		...config,
		setDomains,
		setAdCategories,
	};
};

export default useConfig;
