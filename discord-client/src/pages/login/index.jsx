import React from "react";
import LoginForm from "../../components/login/LoginForm";
import AuthLayout from "../../layouts/auth";

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
