import { useAppSelector } from "@/slices/store";
import { UIActions } from "@/slices/ui";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const useUi = () => {
	const ui = useAppSelector((state) => state.ui);
	const dispatch = useDispatch();
	const setAuthLoading = useCallback(
		(status: boolean) => {
			dispatch(UIActions.setAuthLoading(status));
		},
		[ui.isAuthLoading]
	);

	const setColorScheme = useCallback(
		(scheme: string) => {
			dispatch(UIActions.setColorScheme(scheme));
		},
		[ui.colorScheme]
	);

	return {
		...ui,
		setAuthLoading,
		setColorScheme,
	};
};

export default useUi;
