import React from 'react';
import PropTypes from 'prop-types';

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

// Redux
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

const AddNewChatBot = props => {
    const { 
        handleSubmit=f=>f, 
        reset,  
        open = false, 
        handleClose=f=>f,
        classes,
        handleAddChatBot=f=>f
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
      

      const renderSelectField = ({
        input,
        label,
        meta: { touched, error },
        children,
        ...custom
      }) => (
        <FormControl fullWidth>
          <InputLabel htmlFor="age-native-simple">Тип чат-бота</InputLabel>
          <Select
            native
            {...input}
            {...custom}
            inputProps={{
              name: 'typeOfChatBot',
              id: 'age-native-simple'
            }}
          >
            {children}
          </Select>
        </FormControl>
      )


    const onSubmitHandler = (formData) => {
      handleAddChatBot(formData)
      reset()
     }

    return (
      <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Создать чат-бота</DialogTitle>
        <form onSubmit={ handleSubmit((formData) => onSubmitHandler(formData)) } >

            <DialogContent>
                <DialogContentText>
                    Для подключения необходимо создать бота в Telegram или подключить уже существующий. Если у вас еще нет публичного аккаунта, мы поможем создать его в несколько шагов и подключить к вашему TestAPP
                    Как создать чат-бота в три клика [Почитать](https://wikipedia.com)
                </DialogContentText>
                    <Field
                        name="apiKey"
                        component={renderTextField}
                        label="API ключ"
                    />
                    <Field
                        name="name"
                        component={renderTextField}
                        label="Имя"
                    />
                    <Field
                        classes={classes}
                        name="type"
                        component={renderSelectField}
                        label="Тип чат-бота"
                        >
                            <option value="" />
                            <option value="Тестировщик">Тестировщик</option>
                            <option value="Оповещатель">Оповещатель</option>
                    </Field>
                   
         
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="default">
                    Назад
                </Button>
                <Button type="submit" onClick={handleClose} color="default">
                    Подключить
                </Button>
                {/*  */}
                <Button type="button" onClick={reset} color="default">
                    Очистить форму
                </Button>
            </DialogActions>
        </form>
       
      </Dialog>
    </div>
    )
}

AddNewChatBot.propTypes = {
    children: PropTypes.node
}

const mapStateToProps = ({ chatBots: { chatBot } }) => {
  return {
    chatBot
  }
}
const mapDispatchToProps = dispatch => ({
  handleAddChatBot: (chatBot) => dispatch(actions.addChatBot(chatBot))
})


const decComponent = connect(mapStateToProps, mapDispatchToProps)(AddNewChatBot)


export default reduxForm({
    form: 'addNewChatBotForm', // a unique identifier for this form
})(decComponent)


