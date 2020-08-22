import React, { useState, useContext } from "react";
import loginService from "../sever/login";
import creatService from "../sever/creat";
import { content } from "../App";
const Login = () => {
  let { setUser, setPrompt, setError } = useContext(content);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loginToken", JSON.stringify(user));
      creatService.setToken(user.token);
      setUser(user);
      console.log(user);
      setUsername("");
      setPassword("");
      setPrompt(`login success`);
      setTimeout(() => {
        setPrompt(null);
      }, 5000);
    } catch (exception) {
      setError(true);
      setPrompt(`login error`);
      setTimeout(() => {
        setPrompt(null);
        setError(false);
      }, 5000);
    }
  };
  const synFun = {
    usernameSyn: (event) => {
      setUsername(event.target.value);
    },
    passwordSyn: (event) => {
      setPassword(event.target.value);
    },
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <h1>login</h1>
        <div>
          <span>username</span>
          <input type="text" name="Username" value={username} onChange={synFun.usernameSyn} />
        </div>
        <div>
          <span>password</span>
          <input type="password" name="Password" value={password} onChange={synFun.passwordSyn} />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default Login;
