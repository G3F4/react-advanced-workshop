import React from 'react';
import PropTypes from 'prop-types';
import blue from '@material-ui/core/colors/blue.js';
import Error from '@material-ui/icons/Error.js';
import SmokeFree from '@material-ui/icons/SmokeFree.js';
import AccessibleForward from '@material-ui/icons/AccessibleForward.js';
import LocalParking from '@material-ui/icons/LocalParking.js';
import Wifi from '@material-ui/icons/Wifi.js';
import Pets from '@material-ui/icons/Pets.js';
import FreeBreakfast from '@material-ui/icons/FreeBreakfast.js';
import { withStyles } from '@material-ui/core/styles';

const ICONS_MAP = {
  NON_SMOKING: SmokeFree,
  DISABLED_GUESTS_SERVICE: AccessibleForward,
  PARKING: LocalParking,
  FREE_WIFI: Wifi,
  PETS_ALLOWED: Pets,
  BREAKFAST: FreeBreakfast,
};

const styles = theme => ({
  card: {
    maxWidth: '100%',
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: blue[600],
  },
  price: {
    marginTop: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  floatRight: {
    marginLeft: 'auto',
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    margin: '0 auto',
  },
  facilities: {
    marginTop: theme.spacing.unit * 3,
  },
});

const FacilityIcon = React.memo(({ classes, facilities }) => (
  <div className={classes.facilities}>
    {facilities.map(facility => {
      const Icon = ICONS_MAP[facility] || Error;

      return <Icon key={facility} />;
    })}
  </div>
));

FacilityIcon.propTypes = {
  classes: PropTypes.object,
  facilities: PropTypes.array,
};

export default withStyles(styles)(FacilityIcon);
