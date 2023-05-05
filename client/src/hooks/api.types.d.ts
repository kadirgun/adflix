export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface IVerify {
  id: string;
  hash: string;
  expires: string;
  signature: string;
}

export interface ICreateLink {
  target: string;
  password: string;
  excludes: number[];
}
