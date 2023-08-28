import { Button, TextField } from "@mui/material";

import { DateCalendar, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Alert, Snackbar } from "@mui/material";
import { format } from "date-fns";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { useEffect, useState } from "react";
import "./CadastroAtividade.css";
import { Controller, useForm } from "react-hook-form";
import ListarAtividades from "../ListarAtividades/ListarAtividades";

const CadastroAtividade = ({ openError }) => {
  const maxDate = new Date("2031-01-01");
  const minDate = new Date("2021-01-01");

  const [dateSelected, setDateSelected] = useState(new Date());
  const [horaInicial, setHoraInicial] = useState(null);
  const [horaFinal, setHoraFinal] = useState(null);
  const [show, setShow] = useState(false);
  const [avisoCadastro, setAvisoCadastro] = useState({
    message: "Preencha Todos os Campos",
    value: "error",
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const [atividades, setAtividades] = useState([]);

  const saveAtividades = (newAtividade) => {
    const atvs = [...atividades];
    atvs.push(newAtividade);
    setAtividades(atvs);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShow(false);
  };
  const onSubmit = (atividadeForm) => {
    if (
      !atividadeForm.horaInicial ||
      !atividadeForm.horaFinal ||
      !atividadeForm.titulo ||
      !atividadeForm.descricao
    ) {
      setAvisoCadastro({
        message: "Preencha Todos os Campos",
        value: "error",
      });
      setShow(true);
    } else if (atividadeForm.horaFinal < atividadeForm.horaInicial) {
      setAvisoCadastro({
        message: "A Hora Inicial maior que Hora Final",
        value: "error",
      });
      console.log(avisoCadastro);
      setShow(true);
    } else {
      const dataSelecionada = format(
        atividadeForm.diaSelecionado,
        "dd-MM-yyyy"
      );
      setDateSelected(atividadeForm.diaSelecionado);
      const horaInicial = format(atividadeForm.horaInicial, "HH:mm:ss");
      const horaFinal = format(atividadeForm.horaFinal, "HH:mm:ss");
      const user = JSON.parse(localStorage.getItem("user"));
      let newAtividade = {
        user,
        titulo: atividadeForm.titulo,
        descricao: atividadeForm.descricao,
        dataInicio: dataSelecionada + " " + horaInicial,
        dataFim: dataSelecionada + " " + horaFinal,
        dataAtividade: dataSelecionada,
      };
      setAvisoCadastro({
        message: "Cadastrado com sucesso",
        value: "success",
      });
      setShow(true);
      saveAtividades(newAtividade);
    }
    reset({ horaInicial: null, horaFinal: null });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="cadastroAtividade">
          <Controller
            name="diaSelecionado"
            control={control}
            defaultValue={dateSelected}
            render={({ field }) => (
              <DateCalendar
                views={["year", "month", "day"]}
                maxDate={maxDate}
                minDate={minDate}
                {...field}
              />
            )}
          />
          <div className="formulario">
            <div className="relogios">
              <Controller
                name="horaInicial"
                control={control}
                render={({ field }) => (
                  <TimePicker
                    label="Inicio"
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                    {...field}
                  />
                )}
              />

              <Controller
                name="horaFinal"
                control={control}
                render={({ field }) => (
                  <TimePicker
                    label="Fim"
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="inputsAtividade">
              <Controller
                name="titulo"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    id="filled-basic"
                    label="Titulo"
                    variant="filled"
                    {...field}
                  />
                )}
              />
              <Controller
                name="descricao"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    rows={4}
                    multiline
                    variant="filled"
                    label="Descrição"
                    {...field}
                  />
                )}
              />
              <Button variant="contained" onSubmit={handleSubmit} type="submit">
                Enviar
              </Button>
            </div>
          </div>
        </div>
      </form>
      <Snackbar
        open={show}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
        autoHideDuration={3000}>
        <Alert severity={avisoCadastro.value} sx={{ width: "100%" }}>
          {avisoCadastro.message}
        </Alert>
      </Snackbar>
      <ListarAtividades atividades={atividades} />
    </>
  );
};

export default CadastroAtividade;
