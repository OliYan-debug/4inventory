import axios from "axios";

function getAPIClient() {
  const api = axios.create({
    baseURL: "http://localhost:5000",
  });

  // api.interceptors.request.use((config) => {
  //   console.log(config);

  //   return config;
  // });

  return api;
}

export const api = getAPIClient();
