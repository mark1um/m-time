import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TimePickerForm() {
  const { handleSubmit, control } = useForm();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const onSubmit = (data) => {
    // Exemplo de validação
    if (!data.selectedTime) {
      setIsSnackbarOpen(true);
    } else {
      console.log(data);
    }
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Hora:</label>
          <Controller
            control={control}
            name="selectedTime"
            defaultValue=""
            render={({ field }) => <input type="time" {...field} />}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000} // Duração em milissegundos
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          Selecione uma hora válida.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default TimePickerForm;
