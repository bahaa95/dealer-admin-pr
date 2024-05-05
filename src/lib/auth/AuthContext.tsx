"use client";
import { FC, createContext, useContext, useMemo, useState } from "react";
import { IAuthContext } from "./types";
import { AuthService } from "./authService";

export interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({
  auth: {
    isAuthenticated: false,
    sas: "wifi",
    token: null,
    username: null,
    roles: [],
  },
  setSas: () => {},
  setAuth: () => {},
});

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const authService = useMemo(() => new AuthService(), []);
  [authService.auth, authService.setAuth] = useState(authService.auth);

  return (
    <AuthContext.Provider
      value={{
        auth: authService.auth,
        setAuth: authService.setAuth,
        setSas: authService.setSas,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useaAuth hook can not be used outside of a AuthProvider.");
  }

  return auth;
};
