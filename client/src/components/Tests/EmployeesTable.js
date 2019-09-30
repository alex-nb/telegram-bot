import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Redux
import { connect } from 'react-redux'

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



const SimpleTable = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>ФИО</TableCell>
            <TableCell align="right">Отдел</TableCell>
            <TableCell align="right">Должность</TableCell>
            {/* <TableCell align="right">Действие</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.selectedEmployees.map(employee => (
                <TableRow key={employee.id}>
                    <TableCell component="th" scope="row">
                        {employee.firstName} {employee.secondName}
                    </TableCell>
                    <TableCell align="right">{employee.department}</TableCell>
                    <TableCell align="right">{employee.position}</TableCell>
                </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </Paper>
  );
}

const mapStateToProps = ({ tests: { tests: { targetAudience } } }) => ({
  targetAudience
})

const mapDispatchToProps = {
  
}



export default connect(mapStateToProps, mapDispatchToProps)(SimpleTable)