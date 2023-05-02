export type Auth = {
	access_token?: string | undefined;
}

export type ColorScheme = {
	colorScheme?: "light" | "dark" | undefined;
}


export interface IUser {
  auth: Auth,
  isLoggedin: boolean;
}


export interface IUI {
  colorScheme: ColorScheme;
}