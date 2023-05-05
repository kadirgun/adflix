import { ILogin, IRegister, ICreateLink } from "./api.types";
import useAxios from "./useAxios";

export default () => {
	const axios = useAxios();

	const api = {
    auth: {
      login: async (params: ILogin) => {
        return await axios.post("/auth/login", params)
      },
      register: async (params: IRegister) => {
        return await axios.post("/auth/register", params)
      },
    },
    account: {
      info: async () => {
        return await axios.get("/account")
      }
    },
    links: {
      create: async (params: ICreateLink) => {
        return await axios.post("/links", params)
      }
    }
  }

	return api;
};

