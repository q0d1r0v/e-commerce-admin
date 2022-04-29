import axios from "axios";

const baseURL = process.env.VUE_APP_BASE_URL;
const api = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});
api.interceptors.request.use((request) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    request.headers.common["Authorization"] = `Bearer ${access_token}`;
  }
  return request;
});

export default api;
