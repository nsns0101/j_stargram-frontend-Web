//게시글 값 설정
import React, { useState } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  caption,
  location,
  createdAt
}) => {
  //좋아요했는지의 값들을 가져옴
  const [isLikedS, setIsLiked] = useState(isLiked);
  //좋아요 수를 가져옴
  const [likeCountS, setLikeCount] = useState(likeCount);
  //댓글 적는 칸에 onChange를 부착
  const comment = useInput("");
  return (
    <PostPresenter
      user={user} //게시글을 작성한 유저
      files={files} //게시글이 가지고 있는 이미지 파일
      likeCount={likeCountS} //좋아요 수
      location={location} //지역
      caption={caption} //태그
      isLiked={isLikedS} //좋아요했는지에 대한 정보
      comments={comments} //적혀진 댓글
      createdAt={createdAt} //게시글 생성날짜
      newComment={comment} //입력한 댓글
      setIsLiked={setIsLiked} //좋아요 했는지를 바꿀 수 있는 함수
      setLikeCount={setLikeCount} //좋아요 수를 바꿀 수 있는 함수
    />
  );
};

//유효성검사 shape는 안에 객체가 있을시 함께 사용.
PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  //유저 안에 있는 값들의 유효성 검사
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  //파일
  files: PropTypes.arrayOf(
    //파일 안의 값들의 유효성 검사
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  //좋아요 수
  likeCount: PropTypes.number.isRequired,
  //좋아요를 클릭했는지의 정보
  isLiked: PropTypes.bool.isRequired,
  //댓글
  comments: PropTypes.arrayOf(
    //댓글 안의 값들의 유효성 검사
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  //태그
  caption: PropTypes.string.isRequired,
  //지역
  location: PropTypes.string,
  //생성날짜
  createdAt: PropTypes.string
};

export default PostContainer;
