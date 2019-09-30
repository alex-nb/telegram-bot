import React from 'react'

// Redux
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',  
    },
    table: {
      minWidth: 400,
    },
    button: {
        margin: theme.spacing(1),
    }
}));



const AnswersTable = (props) => {

    const [state, setState] = React.useState({
        checkedA: true
      });

      const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
      };

    const classes = useStyles();
    let counter = 1

    const renderSwitch = (correct) => {
        return (
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Switch 
                            checked={correct} 
                            onChange={handleChange('checkedA')} 
                            value={correct} 
                        />
                    }
                />
            </FormGroup>
        )
    }

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>№ п.п</TableCell>
                    <TableCell align="center">Ответ</TableCell>
                    <TableCell align="center">Правильный?</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {
                    props.responseOptions.map(option => {
                        return (
                            <TableRow key={counter}>
                                <TableCell component="th" scope="row">
                                    {counter++}
                                </TableCell>
                                <TableCell align="center">{option.answerBody}</TableCell>
                                <TableCell align="center">
                                    {renderSwitch('correct' in option)}
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
                </TableBody>
            </Table>
        </Paper>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}


export default connect(mapStateToProps, mapDispatchToProps)(AnswersTable)










