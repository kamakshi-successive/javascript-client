import React from 'react';
import { Icon } from '@material-ui/core';
import CopyrightIcon from '@material-ui/icons/Copyright';

const Footer = () => (
  <footer align="center">
    <Icon>
      <p style={{ fontSize: '17px', color: 'grey' }}>
        <CopyrightIcon />
        Successive Technologies
      </p>
    </Icon>
  </footer>
);
export default Footer;
