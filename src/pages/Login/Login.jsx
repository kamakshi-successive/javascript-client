/* eslint-disable no-console */
// /* eslint-disable no-console */
// import React from 'react';
// import * as yup from 'yup';
// import PropTypes from 'prop-types';
// import {
//   TextField, CssBaseline, Card, Typography, Avatar,
//   CardContent, withStyles, InputAdornment, Button,
// } from '@material-ui/core';
// import { Email, VisibilityOff, LockOutlined } from '@material-ui/icons';
// // import { Redirect } from 'react-router-dom';
// import CircularProgress from '@material-ui/core/CircularProgress';
// // import Box from '@material-ui/core/Box';
// // import ls from 'local-storage';
// import callApi from '../../libs/utils/api';
// import { SnackbarContext } from '../../contexts/SnackBarProvider';

// const Design = (theme) => ({
//   icon: {
//     background: 'red',
//     marginLeft: theme.spacing(22),
//     marginTop: theme.spacing(2),
//   },
//   main: {
//     width: 400,
//     marginTop: theme.spacing(20),
//     marginLeft: theme.spacing(58),
//   },
// });

// class Login extends React.Component {
// schema = yup.object().shape({
//   email: yup.string()
//     .trim().email().required('Email Address is a required field'),
//   password: yup.string()
//     .required('Password is required')
// eslint-disable-next-line max-len
//     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 'Must contain 8 characters, at least one uppercase letter, one lowercase letter and one number'),
// });

// constructor(props) {
//   super(props);
//   this.state = {
//     Email: '',
//     Password: '',
//     touched: {
//       email: false,
//       password: false,
//     },
//     loading: false,
//   };
// }

// handleChange = (key) => ({ target: { value } }) => {
//   this.setState({ [key]: value });
// };

// hasErrors = () => {
//   try {
//     this.schema.validateSync(this.state);
//   } catch (err) {
//     return true;
//   }
//   return false;
// }

// // eslint-disable-next-line consistent-return
// getError = (field) => {
//   const { touched } = this.state;
//   if (touched[field] && this.hasErrors()) {
//     try {
//       this.schema.validateSyncAt(field, this.state);
//       return '';
//     } catch (err) {
//       return err.message;
//     }
//   }
// };

// isTouched = (field) => {
//   const { touched } = this.state;
//   this.setState({
//     touched: {
//       ...touched,
//       [field]: true,
//     },
//   });
// }

// handleCallApi = async (openSnackbar) => {
//   const response = await callApi(state);
//   if (response.token) {
//     openSnackbar('success', 'Login Successfully');
//     localStorage.setItem('token', response.token);
//     history.push('/');
//   } else {
//     this.setState({
//       loading: false,
//     });
//     console.log(response.message);
//     openSnackbar('error', 'Incorrect Credentials');
//   }
// };

// handleLogin = (openSnackbar) => {
//   this.setState({
//     loading: true,
//   });
//   console.log(state);
//   handleCallApi(openSnackbar);
// };

// render() {
//   const { classes } = this.props;
//   const { loading } = this.state;
//   return (
//     <>
//       <SnackbarContext.Consumer>
//         {({ openSnackBar }) => (
//           <div className={classes.main}>
//             <CssBaseline />
//             <Card open aria-labelledby="form-dialog-title">
//               <Avatar className={classes.icon}>
//                 <LockOutlined />
//               </Avatar>
//               <Typography variant="h3" align="center">Login</Typography>
//               <CardContent>
//                 <form>
//                   <div>
//                     <TextField
//                       required
//                       fullWidth
//                       id="outlined-required"
//                       label="Email Address"
//                       defaultValue=" "
//                       variant="outlined"
//                       helperText={this.getError('email')}
//                       error={!!this.getError('email')}
//                       onChange={this.handleChange('email')}
//                       onBlur={() => this.isTouched('email')}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <Email />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </div>
//                   <br />
//                   <div>
//                     <TextField
//                       required
//                       type="password"
//                       fullWidth
//                       id="outlined-required"
//                       label="Password"
//                       variant="outlined"
//                       helperText={this.getError('password')}
//                       error={!!this.getError('password')}
//                       onChange={this.handleChange('password')}
//                       onBlur={() => this.isTouched('password')}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <VisibilityOff />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </div>
// &nbsp;
//                   <div>
// eslint-disable-next-line max-len
//                     <Button variant="contained" color="primary" disabled={this.hasErrors() || !this.isTouched() || loading} onClick={() => handleLogin(openSnackbar)} fullWidth>
//                       SIGN IN
//                       {
//                         loading && (
//                           <CircularProgress
//                             size={24}
//                             className={classes.buttonProgress}
//                           />
//                         )
//                       }
//                     </Button>
//                   </div>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </SnackbarContext.Consumer>
//     </>
//   );
// }
// }

// Login.propTypes = {
//   classes: PropTypes.objectOf(PropTypes.string).isRequired,
//   history: PropTypes.objectOf.isRequired,
// };
// export default withStyles(Design)(Login);
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box } from '@material-ui/core';
import callApi from '../../libs/utils/api';
import { SnackbarContext } from '../../contexts';

const schema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'must contain 8 characters at \n least one uppercase one lowercase \n and one number'),
});

const ls = require('local-storage');

const useStyles = (theme) => ({
  box: {
    marginTop: theme.spacing(16),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      redirect: false,
      hasError: true,
      message: '',
      error: {
        email: '',
        password: '',
      },
      touched: {
        email: false,
        password: false,
      },
    };
  }

  // eslint-disable-next-line consistent-return
  renderRedirect = () => {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/trainee" />;
    }
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  onClickHandler = async (data, openSnackBar) => {
    this.setState({
      loading: true,
      hasError: true,
    });
    const response = await callApi({ data }, 'post', 'user/login');
    ls.set('token', response.data);
    this.setState({ loading: false });
    const Token = ls.get('token');
    if (Token !== 'undefined') {
      this.setState({
        redirect: true,
        hasError: false,
      });
    } else {
      this.setState({
        message: 'This is an error',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }

  hasErrors = () => {
    const { hasError } = this.state;
    schema
      .isValid(this.state)
      .then((valid) => {
        if (!valid !== hasError) {
          this.setState({ hasError: !valid });
        }
      });
  }

  isTouched = (field) => {
    const { touched } = this.state;
    console.log('field', field);
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  getError = (field) => {
    const { error, touched } = this.state;
    if (touched[field]) {
      schema.validateAt(field, this.state).then(() => {
        if (error[field] !== '') {
          this.setState({
            error: {
              ...error,
              [field]: '',
            },
          });
        }
      }).catch((err) => {
        if (err.message !== error[field]) {
          this.setState({
            error: {
              ...error,
              [field]: err.message,
            },
          });
        }
      });
    }
    return error[field];
  }

  render() {
    const { classes } = this.props;
    const {
      email, password, hasError, error, loading,
    } = this.state;
    console.log(this.state);
    this.hasErrors();
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box mx="auto" bgcolor="background.paper" p={2} className={classes.box} boxShadow={3}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Log in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                label="Email Address"
                id="outlined-start-adornment"
                margin="normal"
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
              <TextField
                label="Password"
                id="outlined-start-adornment"
                margin="normal"
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
              <SnackbarContext.Consumer>
                {({ openSnackBar }) => (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    // href="/trainee"
                    className={classes.submit}
                    disabled={loading || hasError}
                    onClick={() => {
                      this.onClickHandler({ email, password }, openSnackBar);
                    }}
                  >
                    {loading && (
                      <CircularProgress />
                    )}
                    {loading && <span>Signing in</span>}
                    {!loading && <span>Sign in</span>}
                    {this.renderRedirect()}
                  </Button>
                )}
              </SnackbarContext.Consumer>
            </form>
          </div>
        </Box>
      </Container>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(useStyles)(Login);
