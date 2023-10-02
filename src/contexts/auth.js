import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, createSession } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogado, setIsLogado] = useState(null);

  useEffect(() => {
    const recuperarUsuario = localStorage.getItem("user");

    if (recuperarUsuario) {
      setUser(JSON.parse(recuperarUsuario));
    }
    setLoading(false);
  }, []);

  const login = async (login, password) => {
    try {
      const response = await createSession(login, password);

      const idUsuarioLogado = response.data.id;
      const token = response.data.token;

      localStorage.setItem("user", JSON.stringify(idUsuarioLogado));
      localStorage.setItem("token", token);

      setIsLogado(true);
      setUser(idUsuarioLogado);
      navigate("/cadastrar");
    } catch (error) {
      console.log(error);
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
