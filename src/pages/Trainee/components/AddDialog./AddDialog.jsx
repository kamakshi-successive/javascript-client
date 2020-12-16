import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  TextField,
  Dialog,
  Grid,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
} from '@material-ui/core';
import {
  VisibilityOff,
} from '@material-ui/icons';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import * as yup from 'yup';
import PropTypes from 'prop-types';

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(3),
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/,
    'Must contain 8 characters at least one uppercase one lowercase and one number'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
});

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
});

class AddDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      hasError: false,
      error: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      touched: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  }

handleChange = (props) => (event) => {
  this.setState({ [props]: event.target.value });
};

hasErrors = () => {
  try {
    schema.validateSync(this.state);
  } catch (err) {
    return true;
  }
  return false;
}

getError = (field) => {
  const { touched } = this.state;
  if (touched[field] && this.hasErrors()) {
    try {
      schema.validateSyncAt(field, this.state);
    } catch (err) {
      return err.message;
    }
  }
  return true;
};

isTouched = (field) => {
  const { touched } = this.state;
  this.setState({
    touched: {
      ...touched,
      [field]: true,
    },
  });
}

render() {
  const { classes } = this.props;
  const { open, onClose, onSubmit } = this.props;
  const {
    name, email, password, confirmPassword, hasError, error,
  } = this.state;
  this.hasErrors();
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add TRAINEE</DialogTitle>
      <DialogContent className={classes.useStyles}>
        <DialogContentText>
          Add your trainee details
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              label="Name "
              id="Name"
              value={name}
              error={!!error.name}
              fullWidth
              onChange={this.handleChange('name')}
              helperText={this.getError('name')}
              onBlur={() => this.isTouched('name')}
              InputProps={{
                startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email Address"
              id="email"
              value={email}
              error={!!error.email}
              fullWidth
              onChange={this.handleChange('email')}
              helperText={this.getError('email')}
              onBlur={() => this.isTouched('email')}
              InputProps={{
                startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Password"
              id="outlined-start-adornment"
              type="password"
              value={password}
              error={!!error.password}
              fullWidth
              onChange={this.handleChange('password')}
              helperText={this.getError('password')}
              onBlur={() => this.isTouched('password')}
              InputProps={{
                startAdornment: <InputAdornment position="start"><VisibilityOff /></InputAdornment>,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Confirm Password"
              id="password"
              type="password"
              error={!!error.confirmPassword}
              fullWidth
              value={confirmPassword}
              onChange={this.handleChange('confirmPassword')}
              helperText={this.getError('confirmPassword')}
              onBlur={() => this.isTouched('confirmPassword')}
              InputProps={{
                startAdornment: <InputAdornment position="start"><VisibilityOff /></InputAdornment>,
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>

        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        {({ openSnackBar }) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              openSnackBar('This is a success message ! ', 'success');
              onSubmit({
                name, email, password, confirmPassword,
              });
            }}
            disabled={hasError}
          >
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
}

export default withStyles(useStyles)(AddDialog);

AddDialog.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
