import React from 'react'
import PropTypes from 'prop-types'

// Redux
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

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

// Cusom Components
// import AddNewTest from './AddNewTest'


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

const ChatBot = props => {

    const [openNewTestModal, setOpenNewTestModal] = React.useState(false);

    const handleClickOpenNewTestModal = () => {
        setOpenNewTestModal(true);
    }
  
    const handleCloseNewTestModal= () => {
        setOpenNewTestModal(false);
    }

    const classes = useStyles();
 
    return (
        <Container maxWidth="md">

            <Grid 
                container 
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid item xs={6}>
                    <p style={{ flexGrow: 1, fontSize: 20 }}>Список тестов:</p>
                </Grid>
                <Grid container justify="flex-end" direction="row" item xs={6}>
                    <Button 
                        variant="contained" 
                        className={classes.button}
                        onClick={handleClickOpenNewTestModal}
                    >
                        Создать новый тест
                    </Button>
                </Grid>
            </Grid>
 
       

            {/* <AddNewTest 
                open={openNewTestModal} 
                handleClose={handleCloseNewTestModal}
            />  */}
        
       </Container>
    )
}

ChatBot.propTypes = {
    children: PropTypes.node
}

const mapStateToProps = ({ chatBots: { chatBots } },  props) => {
    return {
        chatBot: chatBots.find((chatBot) => chatBot.id === props.match.params.id)
    }
} 

export default connect(mapStateToProps)(ChatBot)
