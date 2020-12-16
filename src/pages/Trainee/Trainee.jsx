import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import {
  Button, DialogContentText, DialogContent, DialogActions, DialogTitle, TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import PersonIcon from '@material-ui/icons/Person';
import { useForm } from 'react-hook-form';
// import yup from 'yup';

// const schema = yup.object().shape({
//   name: yup.string().required('Name is Required'),
//   email: yup.string().email().required('Email is required'),
//   password: yup.string().required('Password is Required'),
//   passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'password must match'),
// });

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
const Trainee = () => {
  const classes = useStyles();
  const form = useForm();
  const { errors } = form;
  const [open, setOpen] = React.useState(false);

  const Open = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Button variant="outlined" color="primary" onClick={Open}>
          Add Trainee
        </Button>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-titile">Add Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter Your Trainee Details
            </DialogContentText>
          </DialogContent>
          <Grid item xs={12}>
            <TextField
              PersonIcon
              label="Name"
              variant="outlined"
              fullWidth
              inputProps={{ name: 'Name' }}
              inputRef={({ required: 'Name is Required' })}
              error={!!errors.name}
              helperText={errors.Name && errors.Name.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              PersonIcon
              label="Email"
              variant="outlined"
              fullWidth
              inputProps={{ name: 'Email' }}
              inputRef={({ required: 'Email is Required' })}
              error={!!errors.Email}
              helperText={errors.Email && errors.Email.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              variant="outlined"
              autoComplete="current-password"
              password="password"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-password-input"
              label="Confirm Password"
              type="password"
              variant="outlined"
              autoComplete="current1-password"
            />
          </Grid>

          <DialogActions>
            <Button OnClick={onClose}>
              Cancel
            </Button>
            <Button OnClick={Open}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
};
export default Trainee;
