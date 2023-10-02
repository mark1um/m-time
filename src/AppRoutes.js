import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";

import { AuthProvider, AuthContext } from "./contexts/auth";
import { useContext, useEffect } from "react";
import CadastroAtividade from "./Components/CadastroAtividade/CadastroAtividade";
import Header from "./Components/Header/Header";
const AppRoutes = () => {
  const Private = ({ children }) => {
    const { autenticado, loading, isLogado } = useContext(AuthContext);
    if (loading) {
      return <h1>Carregando...</h1>;
    }
    return autenticado ? children : <Navigate to={"/"} />;
  };

  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route
          exact
          path="/cadastrar"
          element={
            <Private>
              <CadastroAtividade />
            </Private>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
