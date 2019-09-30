import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// Custom components
import AddTest from './AddTest';


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
    },

  }));


const Tests = props => {

    const [openNewTestModal, setOpenNewTestModal] = React.useState(false);

    const handleOpenNewTest = () => {
        setOpenNewTestModal(true);
    }
  
    const handleCloseNewTest= () => {
        setOpenNewTestModal(false);
    }

    const classes = useStyles();

    return (
        <Container maxWidth="md">

            <Grid container 
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item xs={6}>
                        <p style={{ flexGrow: 1, fontSize: 20 }}>Список существующих тестов:</p>
                    </Grid>
                    <Grid container justify="flex-end" direction="row" item xs={6}>
                        <Button 
                            variant="contained" 
                            className={classes.button}
                            onClick={handleOpenNewTest}
                        >
                            Создать тест
                        </Button>
                    </Grid>
            </Grid>

            <Box style={{ display: 'flex', justifyContent: 'center'}}>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Чат-бот</TableCell>
                            <TableCell align="center">Тест</TableCell>
                            <TableCell align="center">Описание</TableCell>
                            <TableCell align="center">ЦА</TableCell>
                            <TableCell align="center">Текущие состояние</TableCell>
                            <TableCell align="center">Результаты</TableCell>
                            <TableCell align="center">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                 
                    <TableBody>
                    {
                        props.tests.map(test => (
                            <TableRow key={test.id}>
                                <TableCell component="th" scope="row">
                                    {test.chatBot}
                                </TableCell>
                                <TableCell align="center">
                                    {test.name}
                                </TableCell>
                                <TableCell align="center">
                                    {test.description}
                                </TableCell>
                                <TableCell align="center">
                                    {test.targetAudience.length} респондентов
                                </TableCell>
                                <TableCell align="center">
                                    <p style={{ color: 'red' }}>Идет тестирование</p>
                                </TableCell>
                                <TableCell align="center">
                                    <p style={{ color: 'red' }}>Посмотреть результаты</p>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => console.log('DELETE CLICKED')} aria-label="Delete">
                                        <DeleteIcon fontSize="medium" />
                                    </IconButton>
                                    <IconButton onClick={() => console.log('EDIT CLICKED')} aria-label="Edit">
                                        <EditIcon fontSize="medium" />
                                    </IconButton>
                                </TableCell>
                            
                            </TableRow>
                        ))
                    }
                    </TableBody>
                    </Table>
                </Paper>
            </Box> 
        
            <AddTest 
                open={openNewTestModal} 
                handleClose={handleCloseNewTest}
            />
        
        </Container>
    )
}

Tests.propTypes = {
    children: PropTypes.node
}

const mapStateToProps = (state) => ({
    tests: state.tests.tests
})

const mapDispatchToProps = {
    
}


export default connect(mapStateToProps, mapDispatchToProps)(Tests)
