//게시글 관련 쿼리
import { gql } from "apollo-boost";

//좋아요 토글
export const TOGGLE_LIKE = gql`
  mutation toggelLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

//댓글 추가
export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
      text
      user {
        username
        avatar
      }
    }
  }
`;
