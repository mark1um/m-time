import { Alert, Container, Snackbar } from "@mui/material";
import Grid from "@mui/material/Grid";

import React, { useEffect, useState } from "react";
import CadastroAtividade from "./Components/CadastroAtividade/CadastroAtividade";
import ListarAtividades from "./Components/ListarAtividades/ListarAtividades";
import TimePickerForm from "./ComponenteTeste";

function App() {
  const [atividades, setAtividades] = useState([]);

  const saveAtividades = (newAtividade) => {
    const atvs = [...atividades];
    atvs.push(newAtividade);
    setAtividades(atvs);
  };

  return (
    <Container>
      <CadastroAtividade saveAtividades={saveAtividades} />
      <ListarAtividades atividades={atividades} />
    </Container>
  );
}

export default App;
