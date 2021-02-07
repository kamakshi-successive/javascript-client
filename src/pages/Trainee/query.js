import { gql } from 'apollo-boost';

const GET_TRAINEE_LIST = gql`
query GetAllTrainees($skip: Int, $limit: Int){
  getAllTrainees(payload: {skip: $skip, limit: $limit}) { 
  message
  count
  data {
    name
    email
    createdAt
    originalId
    id
    }
  }
}
`;
export { GET_TRAINEE_LIST };
