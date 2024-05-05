import { SetState } from "../cart";

export interface IAuth {
  isAuthenticated: boolean;
  sas: ISas;
  username: string | null;
  token: string | null;
  roles: string[];
}

export interface IAuthContext {
  auth: IAuth;
  setAuth: SetState<IAuth>;
  setSas(sas: ISas): void;
}

export type ISas = "wifi" | "ftth";
