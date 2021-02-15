import { gql } from 'apollo-boost';

const GET_TRAINEE_LIST = gql`
query GetAllTrainees($skip: Int, $limit: Int){
  getAllTrainees(payload: {skip: $skip, limit: $limit}) { 
  message
  totalCount
  data {
    name
    email
    createdAt
    originalId
    }
  }
}
`;
export { GET_TRAINEE_LIST };
