//게시글 값 설정
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";

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
  console.log(comments);
  const [isLikedS, setIsLiked] = useState(isLiked);
  //좋아요 수를 가져옴
  const [likeCountS, setLikeCount] = useState(likeCount);
  //현재 보고있는 이미지
  const [currentItem, setCurrentItem] = useState(0);

  //댓글 적는 칸에 onChange를 부착
  const comment = useInput("");

  //좋아요 토글
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });

  //댓글 추가
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value }
  });

  //좋아요 토글 함수
  const toggleLike = () => {
    toggleLikeMutation(); //좋아요를 토글 시켜줌
    //isLikedS값도 토글(-)
    if (isLikedS === true) {
      setIsLiked(false);
      //좋아요 수도 차감
      setLikeCount(likeCountS - 1);
    }
    //토글(+)
    else {
      setIsLiked(true);
      //좋아요 수도 상승
      setLikeCount(likeCountS + 1);
    }
  };

  //이미지를 3초마다 넘겨주는 것
  const slide = () => {
    //현재 보고 있는 파일이 마지막 이미지면
    if (currentItem === files.length - 1) {
      //3초 후에 첫번째 파일로 돌아감
      setTimeout(() => setCurrentItem(0), 3000);
      //현재 보고 있는 파일이 마지막 이미지가 아니면
    } else {
      //3초 후에 다음 이미지를 보여줌
      setTimeout(() => setCurrentItem(currentItem + 1), 3000);
    }
  };

  //componentDidMount, componentDidUpdate 등이 생길때 실행
  useEffect(() => {
    slide();
    //currentItem이 바뀔 때마다 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItem, comments]);

  //키 입력 이벤트 함수
  const onKeyPress = event => {
    //keyCode 13은 Enter
    if (event.keyCode === 13) {
      //엔터를 치면 입력창에 쓴 댓글의 값을 초기화
      //setValue는 useInput으로 선언된 값들을 초기화 할 수 있는 함수
      comment.setValue("");
      addCommentMutation();
    }
    return;
  };

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
      currentItem={currentItem} //현재 보고있는 이미지
      toggleLike={toggleLike} //좋아요를 토글 시키는 함수
      onKeyPress={onKeyPress} //키 입력 이벤트 함수
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
