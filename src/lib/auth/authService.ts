import { SetState } from "../cart";
import { IAuth, ISas } from "./types";

export class AuthService {
  public auth: IAuth = {
    isAuthenticated: false,
    sas: (localStorage.getItem("sas") || "wifi") as ISas,
    token: null,
    username: null,
    roles: [],
  };
  public setAuth: SetState<IAuth> = null as any;

  constructor() {
    this.setSas = this.setSas.bind(this);
  }

  public setSas(sas: ISas) {
    localStorage.setItem("sas", sas);
    this.setAuth((prev) => ({ ...prev, sas }));
  }
}
