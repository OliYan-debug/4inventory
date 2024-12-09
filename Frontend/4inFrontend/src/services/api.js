import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return null;
}

function getAPIClient() {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  const token = getCookie("4inventory.token");

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  return api;
}

export const api = getAPIClient();
