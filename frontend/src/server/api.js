import axios from "axios";

export const api = axios.create({
  baseURL: "https://iot-abp-api-production.up.railway.app/",
});

api.interceptors.request.use((config) => {
  const customConfig = config;

  return customConfig;
});
