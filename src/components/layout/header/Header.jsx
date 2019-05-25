import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const styles = theme => ({
  appBar: {
    marginBottom: theme.spacing.unit,
  },
});

const Header = ({ classes }) => (
  <AppBar position="static" color="default" className={classes.appBar}>
    <Toolbar>
      <Typography variant="h6" color="inherit">
        <a href="/">BOOK IT</a>! THE BEST BOOKING HELPER!
      </Typography>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Header);
