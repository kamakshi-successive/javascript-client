/* eslint-disable no-console */
import React from 'react';
import { Mutation } from '@apollo/react-components';
import { LOGIN_USER } from './mutuation';
import Login from './Login';

const updateCache = (cache, { data: { loginUser } }) => {
  cache.writeData({ data: { token: loginUser } });
  localStorage.setItem('token', loginUser);
};
// console.log('login user  mutation', LOGIN_USER);

export default () => (

  <Mutation mutation={LOGIN_USER} update={updateCache}>
    {
      (loginUser) => (
        <>
          { console.log('wrapper', loginUser) }
          <Login loginUser={loginUser} />
        </>
      )
    }
  </Mutation>
);
