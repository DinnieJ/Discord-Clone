import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const AuthRoute = ({ children, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return <Route {...rest}>{isLoggedIn ? children : <Redirect to="/login" />}</Route>
};

export default AuthRoute;
