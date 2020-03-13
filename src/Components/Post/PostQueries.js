//게시글 관련 쿼리
import { gql } from "apollo-boost";

//좋아요 토글
export const TOGGLE_LIKE = gql`
  mutation toggelLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;
