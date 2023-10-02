import { Button, TextField } from "@mui/material";

import { DateCalendar, TimePicker } from "@mui/x-date-pickers";
import { Alert, Snackbar } from "@mui/material";
import { format } from "date-fns";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { useEffect, useState, useContext } from "react";
import "./CadastroAtividade.css";
import { Controller, useForm } from "react-hook-form";
import ListarAtividades from "../ListarAtividades/ListarAtividades";
import { api } from "../../services/api";
import { AuthContext } from "../../contexts/auth";

const CadastroAtividade = ({ openError }) => {
  const maxDate = new Date("2031-01-01");
  const minDate = new Date("2021-01-01");
  const { user } = useContext(AuthContext);
  const [dateSelected, setDateSelected] = useState(new Date());
  const [horaInicial, setHoraInicial] = useState(null);
  const [horaFinal, setHoraFinal] = useState(null);
  const [show, setShow] = useState(false);
  const [avisoSnack, setAvisoSnack] = useState({
    message: "Preencha Todos os Campos",
    value: "error",
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const [atividades, setAtividades] = useState([]);
  const [atividadesDoDia, setAtividadesDoDia] = useState([]);
  const watchedValues = watch();

  const getAllAtividades = async () => {
    const atividadesAPI = await api.get(`/atividade/${user}`);
    const { data } = atividadesAPI;
    const atividadesAPInew = data.map((atividade) => {
      let dataAtividade = new Date(atividade.data_atividade);
      let dataAtividadeFormatada = format(dataAtividade, "dd-MM-yyyy");
      return {
        ...atividade,
        data_atividade: dataAtividadeFormatada,
      };
    });
    setAtividades(atividadesAPInew);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShow(false);
  };
  const onSubmit = async (atividadeForm) => {
    if (
      !atividadeForm.horaInicial ||
      !atividadeForm.horaFinal ||
      !atividadeForm.titulo ||
      !atividadeForm.descricao
    ) {
      setAvisoSnack({
        message: "Preencha Todos os Campos",
        value: "error",
      });
      setShow(true);
    } else if (atividadeForm.horaFinal < atividadeForm.horaInicial) {
      setAvisoSnack({
        message: "A Hora Inicial maior que Hora Final",
        value: "error",
      });
      setShow(true);
    } else {
      const dataSelecionada = format(
        atividadeForm.diaSelecionado,
        "dd-MM-yyyy"
      );
      setDateSelected(dataSelecionada);
      const horaInicial = format(atividadeForm.horaInicial, "HH:mm:ss");
      const horaFinal = format(atividadeForm.horaFinal, "HH:mm:ss");
      const horasAtividade =
        (atividadeForm.horaFinal - atividadeForm.horaInicial) /
        (1000 * 60 * 60);
      const user = JSON.parse(localStorage.getItem("user"));

      let data_inicio = format(
        atividadeForm.horaInicial,
        "yyyy-MM-dd'T'HH:mm:ss"
      );
      let data_fim = format(atividadeForm.horaFinal, "yyyy-MM-dd'T'HH:mm:ss");
      let data_atividade = format(
        atividadeForm.diaSelecionado,
        "yyyy-MM-dd'T'HH:mm:ss"
      );
      let newAtividade = {
        usuario_id: user,
        titulo: atividadeForm.titulo,
        descricao: atividadeForm.descricao,
        data_inicio,
        data_fim,
        data_atividade,
        horas: horasAtividade,
      };
      console.log(newAtividade);
      setAvisoSnack({
        message: "Cadastrado com sucesso",
        value: "success",
      });
      setShow(true);

      await api.post("/atividade", newAtividade);
    }
    reset({ horaInicial: null, horaFinal: null });
  };

  useEffect(() => {
    const tokenDefault = localStorage.getItem("token");

    api.defaults.headers.Authorization = `Bearer ${tokenDefault}`;
  }, []);

  useEffect(() => {
    getAllAtividades();
  }, [avisoSnack]);

  useEffect(() => {
    let dataAtualSelecionada = new Date();
    dataAtualSelecionada = format(dataAtualSelecionada, "dd-MM-yyyy");
    if (watchedValues.diaSelecionado) {
      dataAtualSelecionada = format(watchedValues.diaSelecionado, "dd-MM-yyyy");
    }
    const atividadeDia = atividades.filter(
      (atividade) => atividade.data_atividade === dataAtualSelecionada
    );
    setAtividadesDoDia(atividadeDia);
  }, [watchedValues.diaSelecionado]);

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
                defaultValue={null}
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
                defaultValue={null}
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
        <Alert severity={avisoSnack.value} sx={{ width: "100%" }}>
          {avisoSnack.message}
        </Alert>
      </Snackbar>
      <ListarAtividades
        atividades={atividadesDoDia}
        setAvisoSnack={setAvisoSnack}
      />
    </>
  );
};

export default CadastroAtividade;
