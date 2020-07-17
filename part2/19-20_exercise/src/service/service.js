import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((request) => request.data);
};

const creat = (newObj) => {
  const request = axios.post(baseUrl, newObj);
  return request.then((request) => request.data);
};

const dele = (id) => {
  axios.delete(`${baseUrl}/${id}`);
};

const update = (id,newObj) =>{
    const request = axios.put(`${baseUrl}/${id}`,newObj)
    return request.then(request=>request.data)
}

export default {
  getAll,
  creat,
  dele,
  update
};
