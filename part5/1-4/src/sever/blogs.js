import axios from "axios";
const baseUrl = "/api/blogs";
const blogs = async () => {
  let getBlogs = await axios.get(baseUrl);
  getBlogs = getBlogs.data;
  console.log(getBlogs);
  return getBlogs;
};
export default { blogs };
