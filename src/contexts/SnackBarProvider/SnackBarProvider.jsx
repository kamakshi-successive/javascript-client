/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import CustomSnackBar from './SnackBar';

const SnackbarContext = React.createContext(() => console.log('Default method triggers'));

const styles = (theme) => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class SnackBarProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSnackBar: false,
      message: '',
      variant: '',
    };
  }

    openSnackBar = (message, variant) => {
      this.setState({
        showSnackBar: true,
        variant,
        message,
      });
    }

    closeSnackBar = () => {
      this.setState({
        showSnackBar: false,
      });
    }

    render() {
      const { children } = this.props;
      const { showSnackBar, message, variant } = this.state;
      return (
        <>
          <div>
            <SnackbarContext.Provider value={{
              openSnackBar: this.openSnackBar,
            }}
            >
              {children}
            </SnackbarContext.Provider>
            <CustomSnackBar
              variant={variant}
              message={message}
              open={showSnackBar}
              onClose={this.closeSnackBar}
            />
          </div>
        </>
      );
    }
}

SnackBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(SnackBarProvider);
export { SnackbarContext };
