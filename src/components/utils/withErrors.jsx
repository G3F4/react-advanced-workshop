import React from 'react';
import Typography from '@material-ui/core/Typography';

const withErrors = Comment => props => props.errors ? (
  <Typography variant="body1">{props.errors}</Typography>
) : (
  <Comment {...props} />
);

export default withErrors
