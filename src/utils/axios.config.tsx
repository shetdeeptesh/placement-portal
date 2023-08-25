import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:8080/",
  // 192.168.250.212
  // baseURL: process.env.REACT_APP_BASE_URL,
});

httpClient.interceptors.request.use(async function (config) {
  const token = await localStorage.getItem("token");  
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default httpClient;