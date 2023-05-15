import { ILogin, IRegister, ICreateLink, IVerify } from "./api.types";
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
      verify: async (params: IVerify) => {
        return await axios.post("/auth/verify", params)
      },
    },
    config: async () => {
      return await axios.get("/config")
    },
    account: {
      info: async () => {
        return await axios.get("/account")
      }
    },
    links: {
      list: async () => {
        return await axios.post("/links/list")
      },
      create: async (params: ICreateLink) => {
        return await axios.post("/links", params)
      },
      edit: async (id: number, params: ICreateLink) => {
        return await axios.put(`/links/${id}`, params)
      },
      delete: async (id: number) => {
        return await axios.delete(`/links/${id}`)
      }
    }
  }

	return api;
};

