import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions'

// Custom Components
import EmployeeForm from './EmployeeForm'


const useStyles = makeStyles(theme => ({
    heading: {
        textAlign: 'center'
    },
    button: {
        margin: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
      },

      rootTable: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
      },
      table: {
        minWidth: 650,
      },
      icon: {
        margin: theme.spacing(2),
        fontSize: 16
      },
      paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: 'none',
      },
      formContainer: {
        display: 'flex',
        flexWrap: 'wrap',
      },
  }));


const Employees = ({ staff, handleDeleteEmployee=f=>f }) => {

    const [openModal, setOpenAModal] = useState(false);
    // useEffect(() => {
    //     handleGetEmployees();
    // }, [handleGetEmployees]);



    const handleClickOpenModal = () => {
        setOpenAModal(true);
    }
  
    const handleCloseModal = () => {
        setOpenAModal(false);
    }
    
    const classes = useStyles();

    return (
        <Container maxWidth="lg">

                <Grid container 
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item xs={6}>
                        <p style={{ flexGrow: 1, fontSize: 20 }}>Действующие сотрудники:</p>
                    </Grid>
                    <Grid container justify="flex-end" direction="row" item xs={6}>
                        {/* <Link color="inherit">Скачать шаблон</Link> */}
                        <Button disabled variant="contained" className={classes.button}>
                            Импорт из Excel
                        </Button>
                        <Button 
                            variant="contained" 
                            className={classes.button}
                            onClick={handleClickOpenModal}
                        >
                            Добавить вручную
                        </Button>
                    </Grid>
                </Grid>

                
                <Paper className={classes.rootTable}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>ФИО</TableCell>
                                <TableCell align="right">Отдел</TableCell>
                                <TableCell align="right">Должность</TableCell>
                                <TableCell align="right">Действия</TableCell>
                                <TableCell align="right">Пройдено тестов</TableCell>
                                <TableCell align="right">Мессенджеры</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                               staff.length > 0 &&  (
                                staff.map(employee => (
                                        <TableRow key={employee.firstName}>
                                            <TableCell component="th" scope="row">
                                                {employee.firstName} {employee.secondName} {employee.patronymic}
                                            </TableCell>
                                            <TableCell align="right">{employee.department}</TableCell>
                                            <TableCell align="right">{employee.position}</TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={() => handleDeleteEmployee(employee)} aria-label="Delete" className={classes.margin}>
                                                    <DeleteIcon fontSize="large" />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="right">5</TableCell>
                                            {/* <TableCell align="right">{employee.passedTests}</TableCell> */}
                                            <TableCell align="right">Telegram</TableCell>
                                            {/* <TableCell align="right">{employee.messengers}</TableCell> */}
                                        </TableRow>
                                    ))
                                )
                               
                            }
                           
                        </TableBody>
                    </Table>
                </Paper>

                <EmployeeForm handleClose={handleCloseModal} open={openModal} />

        </Container>
    )
}

Employees.propTypes = {
    children: PropTypes.node,
    // handleGetEmployees: PropTypes.func.isRequired,
}

const mapStateToProps = ({ employees: { employees } }) =>  {
    // console.log(employees)
    return {
        staff: employees,
        // staff: Object.keys(employees).map((key) => employees[key]),
    }
}


const mapDispatchToProps = dispatch => ({
    // handleGetEmployees: () => dispatch(actions.getEmployees()),
    handleDeleteEmployee: (employee) => dispatch(actions.deleteEmployee(employee))
})




export default connect(mapStateToProps, mapDispatchToProps)(Employees)
