import { Button, TextField } from "@mui/material";

import { DateCalendar, DatePicker, TimePicker } from "@mui/x-date-pickers";

import { format } from "date-fns";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { useState } from "react";
import "./CadastroAtividade.css";
import { Controller, useForm } from "react-hook-form";

const CadastroAtividade = ({ onAddAtividades }) => {
  const maxDate = new Date("2031-01-01");
  const minDate = new Date("2021-01-01");

  const [dateSelected, setDateSelected] = useState(new Date());
  const [horaInicial, setHoraInicial] = useState(null);
  const [horaFinal, setHoraFinal] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
          <DatePicker
            className="diaSelecionado"
            label="Dia"
            defaultValue={dateSelected}
            value={dateSelected}
            readOnly
          />
          <div className="relogios">
            <Controller
              name="horaInicial"
              control={control}
              rules={{ required: true }}
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
              rules={{ required: true }}
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
              rules={{ required: true }}
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
              rules={{ required: true }}
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
          </div>
        </div>
      </div>
      <Button onClick={handleSubmit} type="submit">
        Enviar
      </Button>
    </form>
  );
};

export default CadastroAtividade;
