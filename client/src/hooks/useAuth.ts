import { useAppSelector } from "@/slices/store";
import { UserInfo } from "@/slices/types";
import { UserActions } from "@/slices/user";
import { useDispatch } from "react-redux";

export default () => {
	const auth = useAppSelector((state) => state.user);
	const isLoggedin = !!auth.auth.access_token;
	const dispatch = useDispatch();
	const destroy = () => dispatch(UserActions.destroyAuth());
	const setUser = (user: UserInfo) => dispatch(UserActions.setAccount(user));
	return { 
		...auth.auth,
		isLoggedin,
		account: auth.account,
		destroy,
		setUser,
	};
};

