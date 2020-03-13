//피드 관련 쿼리함수
import { gql } from "apollo-boost";

//
export const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
          avatar
        }
      }
      createdAt
      updatedAt
    }
  }
`;
