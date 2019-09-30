import React from 'react';
import PropTypes from 'prop-types';

// UI Material
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

// Redux
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

const EditChatBot = props => {

    const { 
        handleSubmit=f=>f, 
        reset,  
        open = false, 
        handleClose=f=>f,
        classes,
        handleEditChatBot=f=>f
    } = props

    const renderTextField = ({
        label,
        input,
        ...custom
      }) => (
        <TextField
            // margin="dense"
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
      handleEditChatBot(formData)
      reset()
     }

     if(!props.chatBot) {
         return <div>Loading</div>
     }

    return (
      <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Отредактировать чат-бота</DialogTitle>

        <form onSubmit={ handleSubmit((formData) => onSubmitHandler(formData)) } >

            <DialogContent>
  
                    <Field
                        name="apiKey"
                        component={renderTextField}
                        label="API ключ"
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
                    Сохранить
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

EditChatBot.propTypes = {
    children: PropTypes.node
}

const mapStateToProps = ({ chatBots: { chatBot } }) => {
  return {
    chatBot
  }
}
const mapDispatchToProps = dispatch => ({
  handleEditChatBot: (chatBot) => dispatch(actions.editChatBot(chatBot))
})


const decComponent = connect(mapStateToProps, mapDispatchToProps)(EditChatBot)


export default reduxForm({
    form: 'editChatBot', // a unique identifier for this form
    enableReinitialize : true
})(decComponent)


