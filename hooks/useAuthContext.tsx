/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useContext } from "react";
import useAuth, { Auth } from "./useAuth";

const AuthContext = createContext<Auth>({
  user: null,
  loading: true,
  login: async (providerName: string) => {},
  logOut: async () => {},
});

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props): JSX.Element {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): Auth {
  return useContext(AuthContext);
}
