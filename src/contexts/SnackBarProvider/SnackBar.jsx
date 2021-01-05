import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { bool, func, string } from 'prop-types';

const CustomSnackBar = (props) => {
  const {
    open, message, onClose, status,
  } = props;
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <MuiAlert elevation={6} variant="filled" onClose={onClose} severity={status}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

CustomSnackBar.propTypes = {
  message: string,
  status: string,
  open: bool.isRequired,
  onClose: func.isRequired,
};

CustomSnackBar.defaultProps = {
  message: '',
  status: 'info',
};

export default CustomSnackBar;
