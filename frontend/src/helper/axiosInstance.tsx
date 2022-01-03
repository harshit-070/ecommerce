import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URI,
  // headers: {
  //   "Content-Type": "multipart/form-data",
  // },
});

export default axiosInstance;
