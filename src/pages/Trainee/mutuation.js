import { gql } from 'apollo-boost';

const CREATE_TRAINEE = gql`
mutation CreateTrainee($name: String!, $email: String!, $password: String!) {
    createTrainee(payload: { name: $name, email: $email,password: $password}) {
      message
      status
    }
}
`;

const UPDATE_TRAINEE = gql`
mutation UpdateTrainee($id: ID!, $name: String, $email: String) {
    updateTrainee(payload: { id: $id,name: $name, email: $email}){
      status
    }
}
`;

const DELETE_TRAINEE = gql`
mutation Deletetrainee($originalId: String!) {
    deleteTrainee(payload: {originalId: $originalId} )
    {
      message
    }
}
`;

export { DELETE_TRAINEE, UPDATE_TRAINEE, CREATE_TRAINEE };
