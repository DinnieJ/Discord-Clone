import React from "react";
import "./auth.scss";


const AuthLayout = ({ children }) => {
  return <div className="auth-layout w-full h-full fixed flex items-center justify-center">{children}</div>;
};

export default AuthLayout;
