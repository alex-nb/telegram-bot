import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(4)
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1
    },
    navlink: {
        padding: '20px',
    }
    
  }));

const Navbar = props => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
          <AppBar position="static" color="default">
              <Toolbar>
                  <Link underline="none" variant="h6" className={classes.title} color="inherit"  component={RouterLink} to="/">Тестирование сотрудников</Link>
                  <Link underline="none" variant="h6" className={classes.navlink} color="inherit"  component={RouterLink} to="/tests">Тесты</Link>
                  <Link underline="none" variant="h6" className={classes.navlink} color="inherit" component={RouterLink} to="/employees">Сотрудники</Link>
                  <Link underline="none" variant="h6" className={classes.navlink} color="inherit" component={RouterLink} to="/chatbots">Чат боты</Link>
                  <Button color="inherit">Войти</Button>
              </Toolbar>
          </AppBar>
        </div>
    )
}

Navbar.propTypes = {
    children: PropTypes.node
}

export default Navbar
