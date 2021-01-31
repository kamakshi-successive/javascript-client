import { gql } from 'apollo-boost';

const GET_TRAINEE_LIST = gql`
query GetAllTrainees($option: options){
  getAllTrainees(option: $option) { 
  message
  totalCount
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
