import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import InformacoesAtividade from "../Modal/InformacoesAtividade";
import DeleteIcon from "@mui/icons-material/Delete";
import ExcluirAtividade from "../Modal/ExcluirAtividade";
import { useEffect } from "react";

const ListarAtividades = ({ atividades, setAvisoSnack }) => {
  const [open, setOpen] = useState(false);
  const [openExcluir, setOpenExcluir] = useState(false);
  const [atividadeSelecionada, setAtividadeSelecionada] = useState({});
  const [idExclusao, setIdExclusao] = useState(null);
  const [exclusaoConfirmada, setExclusaoConfirmada] = useState(false);
  // Adicione uma nova função para lidar com a abertura do modal
  const handleOpenModal = (atividade) => {
    setAtividadeSelecionada(atividade);
    setOpen(true);
  };
  const handleOpenModalExcluir = (id) => {
    setIdExclusao(id);
    setOpenExcluir(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseExcluir = () => {
    setOpenExcluir(false);
  };

  useEffect(() => {
    console.log(exclusaoConfirmada);
    if (exclusaoConfirmada) {
      setAvisoSnack({
        message: "Graças a Deus",
        value: "success",
      });
    }
  }, []);
  return (
    <>
      <ExcluirAtividade
        openExcluir={openExcluir}
        handleCloseExcluir={handleCloseExcluir}
        idExclusao={idExclusao}
        setExclusaoConfirmada={setExclusaoConfirmada}
      />
      <InformacoesAtividade
        atividade={atividadeSelecionada}
        open={open}
        handleClose={handleClose}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Titulo Atividade</TableCell>
              <TableCell align="right">Data Atividade</TableCell>
              <TableCell align="right">Quantidade Horas</TableCell>
              <TableCell align="right">Informações</TableCell>
              <TableCell align="center">Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {atividades.map((atividade, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {atividade.titulo}
                </TableCell>
                <TableCell align="right">{atividade.data_atividade}</TableCell>
                <TableCell align="right">
                  {atividade.horas.toFixed(2)}{" "}
                </TableCell>
                <TableCell align="right">
                  {/* Passe a atividade para a função handleOpenModal */}
                  <Button onClick={() => handleOpenModal(atividade)}>
                    <InfoIcon fontSize="small" />
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleOpenModalExcluir(atividade.id)}>
                    <DeleteIcon color="error" fontSize="small" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListarAtividades;
