import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const creat = async (creatBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const creat = await axios.post(baseUrl, creatBlog, config);
  console.log(creat);
  return creat.data;
};

export default {
  creat,
  setToken,
};
