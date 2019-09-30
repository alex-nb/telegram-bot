import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'

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
import Link from '@material-ui/core/Link';

// Custom Components
import AddChatBot from './AddChatBot'
import EditChatBot from './EditChatBot'


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



const ChatBots = props => {

    const [openAddNewChatBot, setOpenAddNewChatBot] = React.useState(false);
    const [openEditChatBot, setOpenEditChatBot] = React.useState(false);
    const [selectedChatBot, setSelectedChatBot] = React.useState(null);

    const handleClickOpenNewChatBot = () => {
        setOpenAddNewChatBot(true);
    }
  
    const handleCloseNewChatBot= () => {
        setOpenAddNewChatBot(false);
    }

    const handleClickEditChatBot = (chatBot) => {
        setSelectedChatBot(chatBot)
        setOpenEditChatBot(true);
    }
  
    const handleCloseEditChatBot= () => {

        setOpenEditChatBot(false);
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
                        <p style={{ flexGrow: 1, fontSize: 20 }}>Список существующих чат-ботов:</p>
                    </Grid>
                    <Grid container justify="flex-end" direction="row" item xs={6}>
                        <Button 
                            variant="contained" 
                            className={classes.button}
                            onClick={handleClickOpenNewChatBot}
                        >
                            Создать чат-бота
                        </Button>
                    </Grid>
            </Grid>
 
            <Box style={{ display: 'flex', justifyContent: 'center'}}>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Чат-бот</TableCell>
                            <TableCell align="center">Тип</TableCell>
                            <TableCell align="center">Действие</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.chatBots.map(chatBot => (
                            <TableRow key={chatBot.id}>
                                <TableCell component="th" scope="row">
                                   <Link underline="none" color="inherit" component={RouterLink} to={`/chatBots/${chatBot.id}`}>{chatBot.name}</Link>
                                </TableCell>
                                <TableCell align="center">{chatBot.type}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => props.handleDeleteChatBot(chatBot)} aria-label="Delete">
                                        <DeleteIcon fontSize="medium" />
                                    </IconButton>
                                    <IconButton onClick={() => handleClickEditChatBot(chatBot)} aria-label="Edit">
                                        <EditIcon fontSize="medium" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </Paper>
            </Box> 
            
            <AddChatBot 
                open={openAddNewChatBot} 
                handleClose={handleCloseNewChatBot}
            />
            
            {
                props.chatBot && (
                    <EditChatBot
                        initialValues={selectedChatBot} 
                        open={openEditChatBot} 
                        handleClose={handleCloseEditChatBot}
                    />
                )
            }                
            

       </Container>
       
   

    )
}

ChatBots.propTypes = {
    children: PropTypes.node
}


const mapStateToProps = ({ chatBots }) => {
    // console.log(chatBots.chatBot)
    return {
        chatBots: chatBots.chatBots,
        chatBot: chatBots.chatBot
    }
}

const mapDispatchToProps = dispatch => ({
    handleAddChatBot: (chatBot) => dispatch(actions.addChatBot(chatBot)),
    handleDeleteChatBot: (chatBot) => dispatch(actions.deleteChatBot(chatBot)),
})


export default connect(mapStateToProps, mapDispatchToProps)(ChatBots)






