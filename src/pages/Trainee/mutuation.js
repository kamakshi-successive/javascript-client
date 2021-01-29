/* eslint-disable no-console */
import { gql } from 'apollo-boost';

const CREATE_USER = gql`
    mutation createTrainee($name: String, $email: String, $password: String) {
      CreateUser(payload: {name: $name,email: $email, password: $password }){
        name,
        email
      }
    }
`;

const UPDATE_USER = gql`
    mutation updateTrainee($name: String, $email: String, $role: String, $password: String, $id: String) {
      UpdateUser(payload: { name: $name,email: $email, role: $role,password: $password,id: $id })
    }
`;

const DELETE_USER = gql`
    mutation deleteTrainee($originalId: String!) {
      DeleteUser(payload: { originalId: $originalId })
    }
`;

export {
  CREATE_USER, UPDATE_USER, DELETE_USER,
};
