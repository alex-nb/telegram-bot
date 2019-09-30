import React from 'react';
import PropTypes from 'prop-types';


// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../../store/actions'


const EmployeeForm = (props) => {
    const { 
        handleSubmit=f=>f, 
        reset,  
        open = false, 
        handleClose=f=>f,
        handleAddEmployee=f=>f 
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

     const onSubmitHandler = (newEmployee) => {
        handleAddEmployee(newEmployee)
        reset()
     }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Добавить сотрудника</DialogTitle>
        <form onSubmit={ handleSubmit((newEmployee) => onSubmitHandler(newEmployee)) } >
            <DialogContent>
                    <Field
                        name="firstName"
                        component={renderTextField}
                        label="Имя"
                    />
         
                    <Field
                        name="secondName"
                        component={renderTextField}
                        label="Фамилия"
                    />
                    <Field
                        name="patronymic"
                        component={renderTextField}
                        label="Отчество"
                    />
                    <Field
                        name="position"
                        component={renderTextField}
                        label="Должность"
                    />
                    <Field
                        name="department"
                        component={renderTextField}
                        label="Департамент"
                    />
                    <Field
                        name="phoneNumber"
                        component={renderTextField}
                        label="Номер телефона"
                        type="number"
                    />
            </DialogContent>
            <DialogActions>
                <Button disabled color="primary">
                    Запустить определение
                </Button>
                <Button onClick={handleClose} color="default">
                    Назад
                </Button>
                <Button type="submit" onClick={handleClose} color="default">
                    Добавить
                </Button>
                {/*  */}
                <Button type="button" onClick={reset} color="default">
                    Очистить
                </Button>
            </DialogActions>
        </form>
       
      </Dialog>
    </div>
  );
}


EmployeeForm.propTypes = {
    children: PropTypes.node,
    handleGetEmployees: PropTypes.func.isRequired,
}


const mapDispatchToProps = dispatch => ({
    handleAddEmployee: (newEmployee) => dispatch(actions.addEmployee(newEmployee))
})

const decComponent = connect(null, mapDispatchToProps)(EmployeeForm)


export default reduxForm({
    form: 'addEmployeeForm', // a unique identifier for this form
})(decComponent)


  


