/* eslint-disable no-console */
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { SnackbarContext } from '../../../../contexts/index';
// import callApi from '../../../../libs/utils/api';

class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      loading: false,
    };
  }

handleChange = (prop) => (event) => {
  this.setState({ [prop]: event.target.value }, () => console.log(this.state));
};

handleClose = () => {
  this.setState({ open: false });
};

render() {
  const {
    open, onClose, onSubmit, data,
  } = this.props;
  const { loading } = this.state;
  return (
    <Dialog
      open={open}
      onClose={() => this.handleClose()}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">Remove Trainee</DialogTitle>
      <DialogContentText style={{ marginLeft: 25 }}>
        Do you really want to remove the trainee?
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <SnackbarContext.Consumer>
            {({ openSnackBar }) => (
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  onSubmit(data, openSnackBar);
                }}
              >
                {loading && (
                  <CircularProgress size={15} />
                )}
                {loading && <span>Deleting</span>}
                {!loading && <span>Delete</span>}
              </Button>
            )}
          </SnackbarContext.Consumer>
        </DialogActions>
      </DialogContentText>
    </Dialog>
  );
}
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default (DeleteDialog);
