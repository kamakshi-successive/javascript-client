import React from 'react';
import NavBar from '../../Navbar';

const PrivateLayout = (props) => {
  const { children } = props;
  return (
    <>
      <NavBar />
      <br />
      {children}
    </>
  );
};
export default PrivateLayout;
