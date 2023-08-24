import { Button, TextField } from "@mui/material";

import { DateCalendar, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Alert, Snackbar } from "@mui/material";
import { format } from "date-fns";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { useState } from "react";
import "./CadastroAtividade.css";
import { Controller, useForm } from "react-hook-form";

const CadastroAtividade = ({ saveAtividades, openError }) => {
  const maxDate = new Date("2031-01-01");
  const minDate = new Date("2021-01-01");

  const [dateSelected, setDateSelected] = useState(new Date());
  const [horaInicial, setHoraInicial] = useState(null);
  const [horaFinal, setHoraFinal] = useState(null);
  const [show, setShow] = useState(false);
  const [messageSnack, setMessageSnack] = useState("Preencha Todos os campos");
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

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
      setShow(true);
    } else if (atividadeForm.horaFinal < atividadeForm.horaInicial) {
      setMessageSnack("A Hora Inicial maior que Hora Final");
      setShow(true);
    } else {
      const dataSelecionada = format(
        atividadeForm.diaSelecionado,
        "dd-MM-yyyy"
      );
      const horaInicial = format(atividadeForm.horaInicial, "HH:mm:ss");
      const horaFinal = format(atividadeForm.horaFinal, "HH:mm:ss");
      let obj = {
        titulo: atividadeForm.titulo,
        descricao: atividadeForm.descricao,
        dataInicio: dataSelecionada + " " + horaInicial,
        dataFim: dataSelecionada + " " + horaFinal,
        dataAtividade: dataSelecionada,
      };

      saveAtividades(obj);
      console.log(obj);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="cadastroAtividade">
        <Controller
          name="diaSelecionado"
          control={control}
          defaultValue={dateSelected}
          render={({ field: { onChange, value } }) => (
            <DateCalendar
              views={["year", "month", "day"]}
              onChange={onChange}
              value={value}
              maxDate={maxDate}
              minDate={minDate}
            />
          )}
        />
        <div className="formulario">
          <div className="relogios">
            <Controller
              name="horaInicial"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TimePicker
                  label="Inicio"
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              name="horaFinal"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TimePicker
                  label="Fim"
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className="inputsAtividade">
            <Controller
              name="titulo"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  id="filled-basic"
                  label="Titulo"
                  variant="filled"
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="descricao"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  rows={4}
                  multiline
                  variant="filled"
                  label="Descrição"
                  onChange={onChange}
                />
              )}
            />
            <Button variant="contained" onClick={handleSubmit} type="submit">
              Enviar
            </Button>
          </div>
        </div>
      </div>

      <Snackbar
        open={show}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {messageSnack}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default CadastroAtividade;
