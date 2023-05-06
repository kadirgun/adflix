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

	const setAdTypes = useCallback(
		(adTypes: any) => {
			dispatch(ConfigActions.setAdTypes(adTypes));
		},
		[config.ads_types]
	);

	return {
		...config,
		setDomains,
		setAdTypes,
	};
};

export default useConfig;
