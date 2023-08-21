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
const ListarAtividades = ({ atividades }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Titulo Atividade</TableCell>
            <TableCell align="right">Dia Atividade</TableCell>
            <TableCell align="right">Quantidade Horas</TableCell>
            <TableCell align="right">Editar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {atividades.map((atividade, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {atividade.tituloAtividade}
              </TableCell>
              <TableCell align="right">{atividade.dataAtividade}</TableCell>
              <TableCell align="right">teste</TableCell>
              <TableCell align="right">
                <Button>
                  <EditIcon fontSize="small" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListarAtividades;
