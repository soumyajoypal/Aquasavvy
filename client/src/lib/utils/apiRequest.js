import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://aquasavvy-2.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;
