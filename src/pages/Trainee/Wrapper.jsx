/* eslint-disable no-console */
import React from 'react';
import { Query } from '@apollo/react-components';
import { GET_TRAINEE_LIST } from './query';
import TraineeList from './TraineeList';

export default () => (

  <Query query={GET_TRAINEE_LIST}>
    {
      ({
        loading, error, data, refetch,
      }) => {
        if (loading) {
          return <p>Loading...</p>;
        }
        if (error) {
          console.log('>>ERROR>>', error);
          return <p>Error...</p>;
        }
        console.log('>>>data>>>', data);
        return (
          <TraineeList getTrainee={data} refetch={refetch} />
        );
      }
    }
  </Query>
);
