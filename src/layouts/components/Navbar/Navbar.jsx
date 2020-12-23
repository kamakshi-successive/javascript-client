import React from 'react';
import {
  Toolbar, AppBar, makeStyles, Typography, Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Trainee Portal
          </Typography>
          <Button component={Link} to="/Trainee" color="inherit">TRAINEE</Button>
          <Button component={Link} to="/TextFieldDemo" color="inherit">TEXTFIELD DEMO</Button>
          <Button component={Link} to="/InputDemo" color="inherit">INPUT DEMO</Button>
          <Button component={Link} to="/CalculatorDemo" color="inherit">CHILDREN DEMO</Button>
          <Button color="inherit" style={{ marginLeft: 30 }}>LOGOUT</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
