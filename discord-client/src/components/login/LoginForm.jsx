import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../common/TextInput";
import "./LoginForm.scss";
import { login } from "../../redux/auth";
import { Redirect } from "react-router";
import { showSnackbar } from "../../redux/snackbar";
import { ERROR_SNACKBAR, SUCCESS_SNACKBAR } from "../../constants/snackbar";
import { SocketContext } from "../../utils/socket";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  

  const clickLogin = async () => {
    setLoading(true)
    await dispatch(login({ username, password }))
      .unwrap()
      .then((res) => {
        dispatch(showSnackbar({ type: SUCCESS_SNACKBAR, message: 'Login successful !' }))
      }).catch(err => {
        dispatch(showSnackbar({ type: ERROR_SNACKBAR, message: err.message }))
      })
      .finally(() => {
        setLoading(false)
      })
  };


  const dispatch = useDispatch();

  if(isLoggedIn) return <Redirect to="/dashboard"/>
  
  return (
    <div className="md:rounded-lg p-8  xs:w-full login-form flex flex-col justify-start items-center shadow-xl">
      <div className="flex flex-col items-start justify-start w-full">
        <h1 className="font-bold text-white text-2xl">Welcome back!</h1>
        <p className="text-gray-400 my-1">We're so excited to see you again</p>
      </div>
      <div className="w-full">
        <label htmlFor="username" className="text-gray-200 font-bold text-sm">
          Username
        </label>
        <TextInput
          id="username"
          type="text"
          className="my-3 w-full"
          value={username}
          setValue={setUsername}
        />
        <label htmlFor="password" className="text-gray-200 font-bold text-sm">
          Password
        </label>
        <TextInput
          id="password"
          type="password"
          className="my-3 w-full"
          value={password}
          setValue={setPassword}
        />
      </div>
      <div className="w-full">
        <a
          href="/"
          className="block text-blue-500 font-light text-xs hover:underline"
        >
          Forgot your password ?
        </a>
        <button
          className="w-full text-center rounded-md py-2 my-1.5 text-white bg-indigo-500 hover:bg-indigo-700 transition ease-out duration-150"
          onClick={clickLogin}
        >
          { loading ? '...' : 'Login' }
        </button>
        <p className="text-gray-300 text-xs font-light">
          Need an account ?{" "}
          <span>
            <a href="/" className="text-blue-500 font-light hover:underline">
              Register
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
