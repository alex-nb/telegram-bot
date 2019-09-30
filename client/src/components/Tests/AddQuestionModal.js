import React from 'react'

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

// Custom Components
import CreateAnswerModal from './CreateAnswerModal';
import AnswersTable from './AnswersTable';

const AddQuestionModal = (props) => {

    const { 
        handleSubmit=f=>f, 
        reset,  
        open = false, 
        handleClose=f=>f,
        onGetQuestion=f=>f
    } = props


    const [openAnswerModal, setOpenAnswerModal] = React.useState(false)
    const [responseOptions, setResponseOptions] = React.useState([])

    const handleClickOpenAnswerModal = () => {
        setOpenAnswerModal(true)
    }
    const handleClickCloseAnswerModal = () => {
        setOpenAnswerModal(false)
    }


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


    const onSubmitHandler = ({ body="" }) => {
   
        let question = {
            body: body,
            responseOptions: [...responseOptions]
        }
        setResponseOptions([])
        onGetQuestion(question)
        reset()
     }
     
     const handleResponseOption = (data) => {
        setResponseOptions([...responseOptions, {...data}])
     }


    return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Создать вопрос</DialogTitle>

        <form onSubmit={ handleSubmit((formData) => onSubmitHandler(formData)) } >

            <DialogContent>
                <Field
                    name="body"
                    component={renderTextField}
                    label="Вопрос"
                />
        
                <Button 
                        style={{ marginTop: 15, marginBottom: 15 }}
                        variant="contained" 
                        onClick={handleClickOpenAnswerModal}
                    >
                        Добавить ответ
                </Button>

                <AnswersTable responseOptions={responseOptions}/>    



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

        <CreateAnswerModal 
            open={openAnswerModal}
            handleClose={handleClickCloseAnswerModal}
            handleResponseOption={handleResponseOption}
        />

      </Dialog>

    </div>
    )
}


export default reduxForm({
    form: 'addQuestion', // a unique identifier for this form
})(AddQuestionModal)
