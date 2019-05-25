import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const withSpinner = size => Comment => props => props.fetching ? (
  <CircularProgress size={size || '100%'} thickness={2} />
) : (
  <Comment {...props} />
);

export default withSpinner
