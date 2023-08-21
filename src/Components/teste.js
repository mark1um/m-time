import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ThemeProvider, createTheme } from "@mui/material/styles";
/* import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors"; */
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import "./App.css";
import {
  DateCalendar,
  DatePicker,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
const testes = () => {
  /*   const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  })); */
  const maxDate = dayjs("2030-12-31");
  const minDate = dayjs("2022-01-01");
  const theme = createTheme({
    components: {
      // Name of the component
      MuiDateCalendar: {
        PickersCalendarHeader: {
          // Name of the slot
          root: {
            // Some CSS
            backgroundColor: "red",
          },
        },
      },
    },
  });
  return (
    <>
      <Button variant="contained" endIcon={<SendIcon />}>
        Enviar
      </Button>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <Alert severity="success">This is a success alert — check it out!</Alert>
      <Alert onClose={() => {}} severity="error">
        This is a error alert — check it out!
      </Alert>
      <DatePicker />

      <ThemeProvider theme={theme}>
        <DateCalendar
          disableHighlightToday
          minDate={minDate}
          maxDate={maxDate}
        />
      </ThemeProvider>
    </>
  );
};

export default testes;
