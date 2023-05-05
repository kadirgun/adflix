import { useAppSelector } from "@/slices/store";
import { UIMessage } from "@/slices/types";
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

	const setMessage = useCallback(
		(message: UIMessage) => {
			dispatch(UIActions.setMessage(message));
		},
		[ui.message]
	);

	const getMessage = () => {
		const message: UIMessage = ui.message;
		setMessage({} as UIMessage);
		return message;
	};


	return {
		...ui,
		setAuthLoading,
		setColorScheme,
		messages: {
			set: setMessage,
			get: getMessage
		}
	};
};

export default useUi;
