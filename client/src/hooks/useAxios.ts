import axios from "axios";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/slices/store";
import { UserActions } from "@/slices/user";
import { modals } from '@mantine/modals';

const useAxios = () => {
	const auth = useAppSelector((state) => state.user.auth);
	const dispatch = useDispatch();

	const axiosClient = axios.create({
		baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
	});

	axiosClient.interceptors.request.use((config) => {
		config.headers.Authorization = `Bearer ${auth.access_token}`;
		return config;
	});

	axiosClient.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			const { response } = error;
			if (response?.status === 401) {
				modals.closeAll();
				dispatch(UserActions.destroyAuth());
			}

			throw error;
		}
	);

	return axiosClient;
};

export default useAxios;
