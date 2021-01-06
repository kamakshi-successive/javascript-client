import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import propTypes from 'prop-types';
import MuiAlert from '@material-ui/lab/Alert';

const SnackbarContext = React.createContext();

class SnackBarProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      status: '',
      open: false,
    };
  }

  handleSnackBar = (message, status) => {
    this.setState({
      message,
      status,
      open: true,
    });
  }

  handleCloseSnackBar = (message) => {
    this.setState({
      message,
      open: false,
    });
  }

  render() {
    const { children } = this.props;
    const { message, status, open } = this.state;
    return (
      <>
        <SnackbarContext.Provider
          value={{
            state: { message, status, open },
            openSnackBar: this.handleSnackBar,
            closeSnackBar: this.handleCloseSnackBar,
          }}
        >
          {children}
          <CustomizedSnackbars />
        </SnackbarContext.Provider>
      </>
    );
  }
}
// eslint-disable-next-line react/jsx-props-no-spreading
const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const CustomizedSnackbars = () => {
  const value = React.useContext(SnackbarContext);
  const { closeSnackBar, state } = value;
  const {
    open, message, status,
  } = state;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackBar();
  };
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        {status === 'success' ? (
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        )
          : <Alert onClose={handleClose} severity="error">{message}</Alert>}
      </Snackbar>
    </div>
  );
};

SnackBarProvider.propTypes = {
  children: propTypes.element.isRequired,
};

export { SnackbarContext, SnackBarProvider };
