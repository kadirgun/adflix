import { useAppSelector } from "@/slices/store";
import { UIActions } from "@/slices/ui";
import { useDispatch } from "react-redux";

const useUi = () => {
	const ui = useAppSelector((state) => state.ui);
	const dispatch = useDispatch();
	const setAuthLoading = (status: boolean) => dispatch(UIActions.setAuthLoading(status));
	return { 
		...ui,
    setAuthLoading
	};
};

export default useUi;
