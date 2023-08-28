import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login/Login";

import { AuthProvider, AuthContext } from "./contexts/auth";
import ListarAtividades from "./Components/ListarAtividades/ListarAtividades";
import { useContext, useState } from "react";
import CadastroAtividade from "./Components/CadastroAtividade/CadastroAtividade";

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { autenticado } = useContext(AuthContext);

    if (!autenticado) {
      return <Navigate to="/" />;
    }
    return children;
  };
  return (
    <AuthProvider>
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
