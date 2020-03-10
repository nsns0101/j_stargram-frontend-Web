//로그인 관련 쿼리
import { gql } from "apollo-boost";

//requestSecret
export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;
