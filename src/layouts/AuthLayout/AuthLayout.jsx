import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components/Footer';

// eslint-disable-next-line no-unused-vars
const AuthLayout = ({ children, ...rest }) => (
  <div>
    <div>{children}</div>
    <Footer />
  </div>
);
AuthLayout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
};

export default AuthLayout;
