import { Button, TextField } from "@mui/material";

import { DateCalendar, DatePicker, TimePicker } from "@mui/x-date-pickers";

import { format } from "date-fns";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { useState } from "react";
import "./CadastroAtividade.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const CadastroAtividade = ({ onAddAtividades }) => {
  const maxDate = new Date("2031-01-01");
  const minDate = new Date("2021-01-01");

  const [tituloAtividade, setTituloAtividade] = useState();
  const [descricaoAtividade, setDescricaoAtividade] = useState();
  const [dateSelected, setDateSelected] = useState(new Date());
  const [dataFormatada, setDataFormatada] = useState();
  const [horaInicial, setHoraInicial] = useState();
  const [horaFinal, setHoraFinal] = useState();
  const handleDate = (newDate) => {
    const data = format(newDate, "dd-MM-yyyy");
    setDataFormatada(data);
    setDateSelected(newDate);
  };

  const handleHoraInicial = (horaInicial) => {
    const horaFormat = format(horaInicial, "HH:mm:ss");
    setHoraInicial(horaFormat);
  };

  const handleHoraFinal = (horaFinal) => {
    const horaFormat = format(horaFinal, "HH:mm:ss");
    setHoraFinal(horaFormat);
  };

  const onSalvar = () => {
    console.log(
      "data:",
      dataFormatada,
      "hora I:",
      horaInicial,
      "hora F:",
      horaFinal
    );
    let obj = {
      tituloAtividade,
      descricaoAtividade,
      dataInicio: dataFormatada + " " + horaInicial,
      dataFim: dataFormatada + " " + horaFinal,
      dataAtividade: dataFormatada,
    };
    onAddAtividades(obj);
  };
  return (
    <div className="cadastroAtividade">
      <DateCalendar
        views={["year", "month", "day"]}
        onChange={(newValue) => handleDate(newValue)}
        maxDate={maxDate}
        minDate={minDate}
      />

      <div className="formulario">
        <DatePicker
          className="diaSelecionado"
          label="Dia"
          value={dateSelected}
          readOnly
        />
        <div className="relogios">
          <TimePicker
            label="Inicio"
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            onChange={(newValue) => handleHoraInicial(newValue)}
          />

          <TimePicker
            label="Fim"
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            onChange={(newValue) => handleHoraFinal(newValue)}
          />
        </div>

        <div className="inputsAtividade">
          <TextField
            id="filled-basic"
            label="Titulo"
            variant="filled"
            onChange={(event) => {
              setTituloAtividade(event.target.value);
            }}
          />
          <TextField
            rows={4}
            multiline
            variant="filled"
            label="Descrição"
            onChange={(event) => {
              setDescricaoAtividade(event.target.value);
            }}
          />
          <Button variant="contained" onClick={onSalvar}>
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CadastroAtividade;
