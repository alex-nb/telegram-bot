import React from 'react';

import { Field, reduxForm } from 'redux-form';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel'

// Redux
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));


const CreateAnswerModal = (props) => {
    const { 
        handleSubmit=f=>f, 
        reset,  
        open = false, 
        handleClose=f=>f,
        handleResponseOption
    } = props




    const renderTextField = ({
        label,
        input,
        ...custom
      }) => (
        <TextField
            margin="dense"
            label={label}
            type="text"
            fullWidth
            {...input}
            {...custom}
        />
    )

    const renderCheckbox = ({ input, label }) => (
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={input.value ? true : false}
                onChange={input.onChange}
              />
            }
            label={label}
          />
        </div>
    )


    const onSubmitHandler = (formData) => {
        handleResponseOption(formData)
        reset()
     } 


    return (
       
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Создать вопрос</DialogTitle>

        <form onSubmit={ handleSubmit((formData) => onSubmitHandler(formData)) } >

            <DialogContent>
                <Field
                    name="answerBody"
                    component={renderTextField}
                    label="Ответ"
                />


            <Field name="correct" component={renderCheckbox} label="Является правильным" />

        
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="default">
                    Назад
                </Button>
                <Button type="submit" onClick={handleClose} color="default">
                    Ок
                </Button>
            </DialogActions>
        </form>

    </Dialog>
   
    )
}

export default reduxForm({
    form: 'addAnswer', // a unique identifier for this form
})(CreateAnswerModal)

