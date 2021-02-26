import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Study Cards
          </Typography>
          <Button color="inherit" component={Link} to="/" style={{marginRight: "10px"}}>
            <span>Home</span>
          </Button>
          <Button color="inherit" component={Link} to="/cards" style={{ marginRight: "10px" }}>
            <span>Cards</span>
          </Button>
          <Button color="inherit" component={Link} to="/newCard" style={{ marginRight: "10px" }}>
            <span>Add</span>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
