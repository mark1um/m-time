import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { api, createSession } from "../services/api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogado, setIsLogado] = useState(true);
  useEffect(() => {
    const recuperarUsuario = localStorage.getItem("user");

    if (recuperarUsuario) {
      setUser(JSON.parse(recuperarUsuario));
    }
    setLoading(false);
  }, []);

  const login = async (login, password) => {
    console.log("login", { login, password });

    try {
      const response = await createSession(login, password);
      const idUsuarioLogado = response.data.id;
      const token = response.data.token;

      localStorage.setItem("user", JSON.stringify(idUsuarioLogado));
      localStorage.setItem("token", token);

      api.defaults.headers.Authorization = `Bearer ${token}`;
      navigate("/cadastrar");
    } catch (error) {
      setIsLogado(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    console.log("logout");
  };

  return (
    <AuthContext.Provider
      value={{ autenticado: !!user, user, login, loading, isLogado }}>
      {children}
    </AuthContext.Provider>
  );
};
