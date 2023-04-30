export type Auth = {
	access_token?: string | undefined;
}

export type ColorScheme = {
	colorScheme?: "light" | "dark" | undefined;
}


export interface IUser {
  auth: Auth
}


export interface IUI {
  colorScheme: ColorScheme;
}