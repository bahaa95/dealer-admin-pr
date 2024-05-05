import { jwtDecode } from "jwt-decode";

type Decode = {
  exp: number;
  iat: number;
  [key: string]: any;
};

export function isValidToken(token?: string): boolean {
  if (!token) {
    return false;
  }

  const { exp } = jwtDecode<Decode>(token);
  //* invalid token
  if (Date.now() >= exp * 1000) {
    return false;
  }

  return true;
}
