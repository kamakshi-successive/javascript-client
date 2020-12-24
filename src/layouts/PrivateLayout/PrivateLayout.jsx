import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../components';

// eslint-disable-next-line no-unused-vars
const PrivateLayout = ({ children, ...rest }) => (
  <div>
    <Navbar />
    <br />
    <div>{children}</div>
    &nbsp;
  </div>
);
PrivateLayout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
};

export default PrivateLayout;
