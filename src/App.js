import { Alert, Container, Snackbar } from "@mui/material";
import Grid from "@mui/material/Grid";

import React, { useEffect, useState } from "react";
import CadastroAtividade from "./Components/CadastroAtividade/CadastroAtividade";
import ListarAtividades from "./Components/ListarAtividades/ListarAtividades";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
function App() {
  const [atividades, setAtividades] = useState([]);

  const saveAtividades = (newAtividade) => {
    const atvs = [...atividades];
    atvs.push(newAtividade);
    setAtividades(atvs);
  };

  return (
    <Container>
      <Snackbar
        open={true}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <CadastroAtividade onAddAtividades={saveAtividades} />
      <ListarAtividades atividades={atividades} />
    </Container>
  );
}

export default App;
