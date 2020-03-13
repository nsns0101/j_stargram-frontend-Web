//공유 쿼리
import { gql } from "apollo-boost";

export const SEE_MY_PROFILE = gql`
  {
    seeMyProfile {
      username
    }
  }
`;
