export interface ILoginSchema {
  username: string;
  password: string;
}

export interface ILoginResponse {
  manager: { username: string };
  token: string;

  roles: string[];
}

export interface IMeResponse {
  manager: { username: string };
  token: string;
  user: {
    roles: string[];
  };
}
