import { gql } from 'apollo-boost';

const GET_TRAINEE_LIST = gql`
  query getAllTrainees{
    getAllTrainees { 
    message
    totalCount
    count
    data {
      name
      email
      createdAt
      }
    }
  }`;
export { GET_TRAINEE_LIST };
