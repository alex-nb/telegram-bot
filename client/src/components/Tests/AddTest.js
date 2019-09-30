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

// Custom Components
import EmployeesTable from './EmployeesTable'
import AddEmployeesModal from './AddEmployeesModal'
import AddQuestionModal from './AddQuestionModal'
import QuestionsTable from './QuestionsTable'
import StartTestModal from './StartTestModal'

const AddTest = props => {


    const [state, setState] = React.useState({
        openAddEmployees: false,
      });

      const [selectedEmployees, setSelectedEmployees] = React.useState([])
      const [questions, setQuestions] = React.useState([])
      const [meta, setMeta] = React.useState({})
      const [openQuestionModal, setOpenQuestionModal] = React.useState(false)
      const [openStartTestModal, setOpenStartTestModal] = React.useState(false)

      const handleClickOpenQuestionModal = () => {
        setOpenQuestionModal(true)
      }
      const handleClickCloseQuestionModal = () => {
        setOpenQuestionModal(false)
      }
      const handleClickOpenStartTestModal = () => {
        setOpenStartTestModal(true)
      }
      const handleClickCloseStartTestModal = () => {
        setOpenStartTestModal(false)
      }

      function handleClickOp() {
        setState({ ...state, openAddEmployees: true });
      }
    
      function handleCl() {
        setState({ ...state, openAddEmployees: false });
      }
      function qwert(employees) {
        setSelectedEmployees([...selectedEmployees, ...employees])
      }

      React.useEffect(() => {
          console.log(questions)

      }, [questions])

      



    const { 
        handleSubmit=f=>f, 
        reset,  
        open = false, 
        handleClose=f=>f,
        classes,
        handleAddTest=f=>f,
        chatBots,
        employees
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
          <InputLabel htmlFor="age-native-simple">Чат-боты</InputLabel>
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
        const copiedFormData = {...formData}
        copiedFormData['targetAudience'] = selectedEmployees
        copiedFormData['questions'] = [...questions]
        copiedFormData['meta'] = {...meta}
        handleAddTest(copiedFormData)
        reset()
     }

     const onGetEmployees = (employees) => {
         qwert(employees)
     }


     const onGetQuestion = (question) => {
        setQuestions([...questions, question])
     }
     const onGetMeta = (metaAdded) => {
        setMeta({...meta, ...metaAdded})
     }




    return (
      <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Создать тест</DialogTitle>
        <form onSubmit={ handleSubmit((formData) => onSubmitHandler(formData)) } >

            <DialogContent>
                <Field
                    name="name"
                    component={renderTextField}
                    label="Наименование"
                />
                <Field
                    name="description"
                    component={renderTextField}
                    label="Описание"
                />
           
                <Field
                    classes={classes}
                    name="chatBot"
                    component={renderSelectField}
                    label="Чат-бот"
                    >
                        {
                            chatBots.map(chatBot => <option key={chatBot.id} value={chatBot.name}>{chatBot.name}</option>)
                        }
                </Field>

    
                    <Button 
                            style={{ marginTop: 15, marginBottom: 15 }}
                            variant="contained" 
                            onClick={handleClickOp}
                        >
                            Добавить сотрудников
                    </Button>


            
                <EmployeesTable selectedEmployees={selectedEmployees}/>

                <Button 
                            style={{ marginTop: 15, marginBottom: 15 }}
                            variant="contained" 
                            onClick={handleClickOpenQuestionModal}
                        >
                            Добавить вопросы
                </Button>

                <QuestionsTable questions={questions}/>

                <Button 
                            style={{ marginTop: 15, marginBottom: 15 }}
                            variant="contained" 
                            onClick={handleClickOpenStartTestModal}
                        >
                            Запустить тест
                </Button>



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


        {/* Modals */}
        <AddEmployeesModal 
            open={state.openAddEmployees}
            handleClose={handleCl}
            onGetEmployees={onGetEmployees}
        />

        <AddQuestionModal 
            onGetQuestion={onGetQuestion}
            open={openQuestionModal}
            handleClose={handleClickCloseQuestionModal}
        />

        <StartTestModal 
            // onGetQuestion={onGetQuestion}
            onGetMeta={onGetMeta}
            open={openStartTestModal}
            handleClose={handleClickCloseStartTestModal}
        />
       
      </Dialog>

       
     
    </div>
    )
}

AddTest.propTypes = {
    children: PropTypes.node
}

const mapStateToProps = ({ chatBots: { chatBots }, employees: { employees } }) => {
//  console.log(chatBots)
  return {
    chatBots,
    employees
  }
}
const mapDispatchToProps = dispatch => ({
  handleAddTest: (test) => dispatch(actions.addTest(test))
})


const decComponent = connect(mapStateToProps, mapDispatchToProps)(AddTest)


export default reduxForm({
    form: 'addNewChatBotForm', // a unique identifier for this form
})(decComponent)


