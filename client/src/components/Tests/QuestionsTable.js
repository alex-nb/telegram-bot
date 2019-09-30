import React from 'react'

// Redux
import { connect } from 'react-redux'

// UI Components
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: '100%',
    },
  }));
  

const QuestionsTable = (props) => {
    const classes = useStyles();
    let counter = 1
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
            <TableHead>
                <TableRow>
                <TableCell align="center">№ п.п</TableCell>
                <TableCell align="center">Вопрос</TableCell>
                <TableCell align="center">Вариантов ответа</TableCell>
                <TableCell align="center">
                    Действия
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                props.questions.map(question => (
                    <TableRow key={question.body}>
                        <TableCell component="th" scope="row">
                            {counter++}
                        </TableCell>
                        <TableCell align="center">
                            {question.body}
                        </TableCell>
                        <TableCell align="center">
                            {question.responseOptions.length}
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
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}


export default connect(mapStateToProps, mapDispatchToProps)(QuestionsTable)


