import { gql } from 'apollo-boost';

const CREATED_TRAINEE_SUB = gql`
subscription {
  traineeAdded{
      originalId
      name
      email
      createdAt
  }
  }
`;

const UPDATED_TRAINEE_SUB = gql`
subscription{
  traineeUpdated{
    message
    status
    data{
      name
      email
      createdAt
      role
      originalId
      id
    }
  }
}
`;

const DELETED_TRAINEE_SUB = gql`
subscription {
  traineeDeleted{
    status
    result
    message
  }
}
`;
export { CREATED_TRAINEE_SUB, DELETED_TRAINEE_SUB, UPDATED_TRAINEE_SUB };
