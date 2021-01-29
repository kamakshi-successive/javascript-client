import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hoc';
// import { ApolloClient } from 'apollo-boost';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';
import Apolloclient from '../../libs/apollo-client';

function Trainee(props) {
  const { match: { path } } = props;
  return (
    <ApolloProvider client={Apolloclient}>
      <Switch>
        <Route exact path={path} component={TraineeList} />
        <Route exact path={`${path}/:traineeId`} component={TraineeDetail} />
      </Switch>

    </ApolloProvider>
  );
}
Trainee.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};
export default Trainee;
