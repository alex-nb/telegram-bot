import React from 'react'
import PropTypes from 'prop-types'

// UI Material
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';


import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import MoreIcon from "@material-ui/icons/MoreVert";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";


// Redux
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const StartTestModal = props => {
  const classes = useStyles();

  const [startDate, handleStartDate] = React.useState(new Date());
  const [finishDate, handleFinishDate] = React.useState(new Date());
  const [selectedTime, handleSelectedTime] = React.useState(null);
  const [amountOfAttempts, setAmountOfAttempts] = React.useState(null);

  // React.useEffect(() => {
  //   console.log(selectedDate);
  //   console.log(selectedTime);
  // })


  const { 
    open = false, 
    handleClose=f=>f,
    onGetMeta=f=>f
  } = props

  const startTimeHandler = (e) => {
    handleSelectedTime(e.target.value)
  }
  const handleAmountOfAttempts = (e) => {
    setAmountOfAttempts(e.target.value)
  }

  const onFormSubmitHandler = (e) => {
    e.preventDefault()
    onGetMeta({
      startDate,
      finishDate,
      selectedTime,
      amountOfAttempts
    })

  }




  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Запустите тест</DialogTitle>

        <form onSubmit={onFormSubmitHandler}>

            <DialogContent>
              <TextField
                // value={selectedTime}
                name="executionTime"
                onChange={startTimeHandler}
                id="time"
                label="Время выполнения"
                type="time"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            

              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                  <DatePicker
                    name="startDate"
                    value={startDate}
                    onChange={handleStartDate}
                    autoOk
                    label="Дата начала"
                    clearable
                    style={{ width: '100%' }}

                  />              
              </MuiPickersUtilsProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                  <DatePicker
                    name="finishDate"
                    value={finishDate}
                    onChange={handleFinishDate}
                    autoOk
                    label="Дата окончания"
                    clearable
                    style={{ width: '100%' }}
                  />              
              </MuiPickersUtilsProvider>


              <TextField
                // value={selectedTime}
                name="attempsAllowed"
                onChange={handleAmountOfAttempts}
                id="attempsAllowed"
                label="Количество попыток для прохождения теста"
                type="number"
                className={classes.textField}
              />
      

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="default">
                    Назад
                </Button>
                <Button type="submit" onClick={handleClose} color="default">
                  Запуск
                </Button>
            </DialogActions>
        </form>


      </Dialog>
  )
}

StartTestModal.propTypes = {

}


export default StartTestModal

