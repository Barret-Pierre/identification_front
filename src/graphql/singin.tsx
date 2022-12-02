// Créer une requête GraphQL

import { gql } from "@apollo/client";

export const SIGNIN = gql`
  mutation Mutation($password: String!, $email: String!) {
    signin(password: $password, email: $email) {
      email
      id
    }
  }
`;
