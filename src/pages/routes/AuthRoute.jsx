import { LockOutlined } from '@material-ui/icons';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';

const LoginLayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <AuthLayout>
        <Component {...matchProps} />
      </AuthLayout>
    )}
  />
);

export default LoginLayoutRoute;
