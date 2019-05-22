import Avatar from '@material-ui/core/Avatar';
import blue from '@material-ui/core/colors/blue.js';
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const styles = {
  avatar: {
    backgroundColor: blue[600],
  },
};

const Rating = ({ classes, rating }) => (
  <div>
    <Typography variant="h6" gutterBottom>
      Good
    </Typography>
    <Avatar className={classes.avatar}>
      {rating.average}
    </Avatar>
    <Typography variant="overline" gutterBottom>
      {`${rating.reviews} reviews`}
    </Typography>
  </div>
);

Rating.propTypes = {
  classes: PropTypes.object,
  rating: PropTypes.object,
};

export default withStyles(styles)(Rating);
