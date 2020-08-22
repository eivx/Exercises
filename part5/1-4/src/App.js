import React, { useState, useEffect, useContext, createContext } from "react";

import blogsService from "./sever/blogs";
import Login from "./components/Login";
import Blog from "./components/Blog";
import Prompt from "./components/Prompt";

export const content = createContext();
const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [prompt, setPrompt] = useState(null);

  const [error, setError] = useState(false);

  useEffect(() => {
    const loginJSON = window.localStorage.getItem("loginToken");
    if (loginJSON) {
      const getUser = JSON.parse(loginJSON);
      setUser(getUser);
    }
    const getBlogsFun = async () => {
      console.log("useEffect");
      const blogs = await blogsService.blogs();
      setBlogs(blogs);
    };
    getBlogsFun();
  }, []);
  return (
    <>
      <content.Provider
        value={{
          user,
          setUser,
          blogs,
          setBlogs,
          prompt,
          setPrompt,
          error,
          setError,
        }}
      >
        {prompt && <Prompt />}
        {user === null && <Login />}
        {user !== null && <Blog />}
      </content.Provider>
    </>
  );
};

export default App;
