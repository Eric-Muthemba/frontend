import React from "react";
import { useLocalStorage } from "usehooks-ts";

type TContext = {
  isLogin: boolean;
  token: string | null;
  roles: string[];
  name :  string | null;
  setToken: (token: string) => void;
  setRoles: (roles: string[]) => void;
  setName: (name: string) => void;
  setIsLogin: (isLogin: boolean) => void
};

const LoginContext = React.createContext<TContext>({
  isLogin: false,
  token: null,
  roles: [],
  name: null,
  setToken: () => {},
  setRoles: () => {},
  setName: () => {},
  setIsLogin: () => {},
});

export const LoginContextProvider: React.FC = (props) => {
  const [isLogin, setIsLogin] = useLocalStorage("isLogin", false);
  const [token, setToken] = useLocalStorage<string | null>("token", null);
  const [roles, setRoles] = useLocalStorage<string[]>("roles", []);
  const [name, setName] = useLocalStorage<string | null>("name", null);


  const loginValue: TContext = {
    isLogin,
    token,
    roles,
    name,
    setToken,
    setRoles,
    setName,
    setIsLogin,
  };

  return (
    <LoginContext.Provider value={loginValue}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
