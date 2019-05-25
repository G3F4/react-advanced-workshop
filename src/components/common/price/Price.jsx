import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  price: {
    marginTop: theme.spacing.unit,
  },
});

const Price = React.memo(({ classes, price }) => (
  <div className={classes.price}>
    <Typography variant="h6" gutterBottom>
      Price
    </Typography>
    <Typography variant="button" gutterBottom>
      {`${price.amount} ${price.currency}`}
    </Typography>
    <Typography variant="overline" gutterBottom>
      {price.breakfast ? (
        <span>Breakfast included</span>
      ) : (
        <span>Breakfast not included</span>
      )}
    </Typography>
  </div>
));

Price.propTypes = {
  classes: PropTypes.object,
  price: PropTypes.object,
};

export default withStyles(styles)(Price);
