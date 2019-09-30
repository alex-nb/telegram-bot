import React from 'react';

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


const AddEmployeesToTest = (props) => {

    const names = props.employees.map((employee) => {
        return `${employee['firstName']} ${employee['secondName']}`;
    });

    React.useEffect(() => {
        // console.log(persons)
    })

    const classes = useStyles();
    const [persons, setPersons] = React.useState([]);
  
    function handleChange(event) {
        setPersons(event.target.value);
    }


    const submitHandler = () => {

        let prs = []
        for (let person of persons) {
            prs.push ( { firstName: person.split(' ')[0], secondName: person.split(' ')[1] } )
        }

        for(let person of prs) {
            const selectedEmployees = props.employees.filter((employee, index) => {
            return (
                (employee.firstName === person.firstName) && (employee.secondName === person.secondName)
                ) 
            })
            if(selectedEmployees.length < 1) continue
            console.log(selectedEmployees)
            props.onGetEmployees(selectedEmployees)
        }

        props.handleClose()

    }

 

 
  return (
    <div>
      <Dialog disableBackdropClick disableEscapeKeyDown open={props.open} onClose={props.handleClose}>
        <DialogTitle>Выберите сотрудников из списка</DialogTitle>
        <DialogContent>
            <div className={classes.root}>
                <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-multiple-checkbox">Сотрудники</InputLabel>
                        <Select
                            multiple
                            value={persons}
                            onChange={handleChange}
                            input={<Input id="select-multiple-checkbox" />}
                            renderValue={selected => []}
                        >
                            {names.map(name => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={persons.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                </FormControl>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Назад
          </Button>
          <Button onClick={submitHandler} color="primary">
            Готово
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


const mapStateToProps = (state) => ({
    employees: state.employees.employees
})

const mapDispatchToProps = {
    
}

  
  
  export default connect(mapStateToProps)(AddEmployeesToTest)