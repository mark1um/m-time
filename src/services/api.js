import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const createSession = async (login, password) => {
  return api.post("/auth/login", { login, password });
};
