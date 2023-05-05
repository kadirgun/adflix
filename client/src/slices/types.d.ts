export type Auth = {
	access_token?: string | undefined;
}

export type UIMessage = {
  type?: "success" | "error" | "warning" | "info" | undefined;
  message?: string | undefined;
}

export interface UserInfo {
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar?: string | null;
  created_at?: string;
  verified?: boolean;
}


export type ColorScheme = {
	colorScheme?: "light" | "dark" | undefined;
}


export interface IUser {
  auth: Auth,
  account: UserInfo,
}


export interface IUI {
  colorScheme: ColorScheme;
}