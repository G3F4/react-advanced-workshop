import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';

const Share = React.memo(({ id, open, onClose, onOpen }) => (
  <div>
    <IconButton aria-label="Share" onClick={() => onOpen(id)}>
      <ShareIcon />
    </IconButton>
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{"Copy this link and share!"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`${window.location.origin}/details?id=${id}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </div>
));

Share.propTypes = {
  classes: PropTypes.object,
  rating: PropTypes.object,
};

export default Share;
