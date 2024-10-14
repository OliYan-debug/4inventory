import axios from "axios";

function getAPIClient() {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  // api.interceptors.request.use((config) => {
  //   console.log(config);

  //   return config;
  // });

  return api;
}

export const api = getAPIClient();
