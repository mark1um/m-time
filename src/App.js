import { Container } from "@mui/material";

import React, { useEffect, useState } from "react";
import CadastroAtividade from "./Components/CadastroAtividade/CadastroAtividade";
import ListarAtividades from "./Components/ListarAtividades/ListarAtividades";
import Login from "./Components/Login/Login";
import AppRoutes from "./AppRoutes";

function App() {
  const [atividades, setAtividades] = useState([]);

  const saveAtividades = (newAtividade) => {
    const atvs = [...atividades];
    atvs.push(newAtividade);
    setAtividades(atvs);
  };

  return (
    <Container>
      {/*       <CadastroAtividade saveAtividades={saveAtividades} />
      <ListarAtividades atividades={atividades} /> */}
      <AppRoutes />
    </Container>
  );
}

export default App;
