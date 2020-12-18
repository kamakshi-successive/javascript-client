import React from 'react';
import { Route } from 'react-router-dom';
import PrivateLayout from '../../components';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <PrivateLayout>
        <Component {...matchProps} />
      </PrivateLayout>
    )}
  />
);

export default PrivateRoute;
