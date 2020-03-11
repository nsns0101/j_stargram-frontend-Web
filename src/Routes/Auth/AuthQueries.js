//로그인 관련 쿼리함수
import { gql } from "apollo-boost";

//requestSecret(email로 로그인 요청)
export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

//createAccount(계정 생성)
export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $firstName: String
    $lastName: String
  ) {
    createAccount(
      username: $username
      email: $email
      firstName: $firstName
      lastName: $lastName
    )
  }
`;

//사용자가 입력한 confirm 코드가 맞으면 confirm코드를 초기화 하고 로그인 성공(토큰 문자열생성)
export const CONFIRM_SECRET = gql`
  mutation confirmSecret($secret: String!, $email: String!) {
    confirmSecret(secret: $secret, email: $email)
  }
`;
//confirm_secret에서 받은 토큰 문자열로 실제 token을 생성
export const LOCAL_LOG_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;
