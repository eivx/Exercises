import React, { useState, useContext } from "react";
import creatService from "../sever/creat";

import { content } from "../App";

const Blog = () => {
  let { blogs, user, setPrompt, setBlogs, setError } = useContext(content);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const logoutFun = () => {
    window.localStorage.removeItem("loginToken");
    window.location.reload(true);
  };
  const creatFun = async (event) => {
    event.preventDefault();
    try {
      creatService.setToken(user.token);
      const creatBlog = await creatService.creat({
        title,
        author,
        url,
      });
      setBlogs(blogs.concat(creatBlog));

      setPrompt(`${title} created successfully`);
      setTimeout(() => {
        setPrompt(null);
      }, 5000);
    } catch (error) {
      setError(true);
      setPrompt(`creat error`);
      setTimeout(() => {
        setPrompt(null);
        setError(false);
      }, 5000);
    }
    console.log(user);
  };
  return (
    <div>
      <h1>Blogs</h1>
      <button onClick={logoutFun}>注销</button>
      <p>{user.name} logged-in</p>
      {blogs
        .filter((blog) => (blog.user.username ? blog.user.username === user.username : blog.user === user.id))
        .map((blog) => (
          <p key={blog.id}>{blog.title}</p>
        ))}
      <h1>Creat</h1>
      <form onSubmit={creatFun}>
        <div>
          <span>title</span>
          <input type="text" text={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          <span>author</span>
          <input type="text" text={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          <span>url</span>
          <input type="text" text={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default Blog;
