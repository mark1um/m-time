import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { api } from "../../services/api";
const ExcluirAtividade = ({
  handleCloseExcluir,
  openExcluir,
  idExclusao,
  setExclusaoConfirmada,
}) => {
  const handleConfirmarExclusao = async () => {
    try {
      const result = await api.delete(`/atividade/${idExclusao}`);
      setExclusaoConfirmada(true);
      handleCloseExcluir();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Dialog
      open={openExcluir}
      onClose={handleCloseExcluir}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        {"Você confirma a exclusão?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleConfirmarExclusao} color="error">
          Excluir
        </Button>
        <Button onClick={handleCloseExcluir} autoFocus>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExcluirAtividade;
