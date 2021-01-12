/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogContentText,
} from '@material-ui/core';
import { Email, VisibilityOff, Person } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import schema from './DialogSchema';
import CustomTextField from './CustomTextField';
import callApi from '../../../../libs/utils/api';
import { SnackbarContext } from '../../../../contexts';

const passwordStyle = () => ({
  passfield: {
    display: 'flex',
    flexdirection: 'row',
  },
  pass: {
    flex: 1,
  },
});
const config = [{
  key: 'name',
  label: 'Name',
  icon: Person,
},
{
  key: 'email',
  label: 'Email',
  icon: Email,
},
{
  key: 'password',
  label: 'Password',
  icon: VisibilityOff,
},
{
  key: 'confirmPassword',
  label: 'Confirm Password',
  icon: VisibilityOff,
},
];

class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Email: '',
      Password: '',
      ConfirmPassword: '',
      touched: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  }

  handleChange = (key) => ({ target: { value } }) => {
    this.setState({ [key]: value });
  }

  hasErrors = () => {
    try {
      schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  }

  // eslint-disable-next-line consistent-return
  getError = (field) => {
    const { touched } = this.state;
    if (touched[field] && this.hasErrors()) {
      try {
        schema.validateSyncAt(field, this.state);
        return '';
      } catch (err) {
        return err.message;
      }
    }
  };

  onClickHandler = async (data, openSnackBar) => {
    this.setState({
      loading: true,
      hasErrors: true,
    });
    const { onSubmit } = this.props;
    const response = await callApi(data, 'post', '/user/create');
    this.setState({ loading: false });
    console.log('response add dialog', response);
    if (response !== null && response.status === 'ok') {
      this.setState({
        hasErrors: false,
        message: 'Data Added by Authorize Person successfully',
      },
      () => {
        const { message } = this.state;
        onSubmit(data);
        openSnackBar(message, 'success');
      });
    } else {
      this.setState({
        hasErrors: false,
        message: ' You are not authorize to submitting a data',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  passwordType = (key) => {
    if (key === 'password' || key === 'confirmPassword') {
      return 'password';
    }
    return '';
  }

  render() {
    const {
      open, onClose, classes,
    } = this.props;
    const {
      id, name, email, password,
    } = this.state;
    const ans = [];
    config.forEach((value) => {
      ans.push(<CustomTextField
        label={value.label}
        onChange={this.handleChange(value.key)}
        onBlur={() => this.isTouched(value.key)}
        helperText={this.getError(value.key)}
        error={!!this.getError(value.key)}
        icons={value.icon}
        type={this.passwordType(value.key)}
      />);
    });

    return (
      <SnackbarContext.Consumer>
        {({ openSnackBar }) => (
          <form>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter your trainee details
                </DialogContentText>
                <div>
                  {ans[0]}
                </div>
            &nbsp;
                <div>
                  {ans[1]}
                </div>
            &nbsp;
                <div className={classes.passfield}>
                  <div className={classes.pass}>
                    {ans[2]}
                  </div>
              &nbsp;
              &nbsp;
                  <div className={classes.pass}>
                    {ans[3]}
                  </div>
                </div>
        &nbsp;
                <div align="right">
                  <Button onClick={onClose} color="primary">CANCEL</Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.onClickHandler({
                        id, name, email, password,
                      }, openSnackBar);
                    }}
                    disabled={this.hasErrors()}
                  >
                    SUBMIT
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </form>
        )}
      </SnackbarContext.Consumer>
    );
  }
}
export default withStyles(passwordStyle)(AddDialog);
AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
