import React, { useContext } from "react";
import LoginContext from "../store/loginContext";

import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();
  const loginCtx = useContext(LoginContext);

  return loginCtx.isLogin ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ from: location }}
    />
  );
};

export default AuthLayout;
