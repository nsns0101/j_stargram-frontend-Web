//게시글
import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea"; //다음줄로 넘어가면 textarea는 스크롤이 생기지만 이 것은 창이 커짐
import FatText from "../FatText";
import Avatar from "../Avatar";
import { HeartFull, HeartEmpty, Comment } from "../Icons";

const Post = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  user-select: none;
  margin-bottom: 25px;
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const File = styled.div`
  max-width: 100%;
  width: 100%;
  height: 600px;
  position: absolute;
  top: 0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

export default ({
  user: { username, avatar },
  location,
  files,
  isLiked,
  likeCount,
  newComment,
  currentItem,
  createdAt,
  toggleLike
}) => (
  <Post>
    {/* 게시글 작성자의 정보 */}
    <Header>
      {/* 작성자 아바타 사이즈 */}
      <Avatar size="sm" url={avatar} />
      <UserColumn>
        {/* 작성자 닉네임 */}
        <FatText text={username} />
        {/* 작성자 지역 */}
        <Location>{location}</Location>
      </UserColumn>
    </Header>
    {/* 작성자가 올린 이미지 파일 */}
    <Files>
      {files &&
        files.map((file, index) => (
          // showing속성은 이미지를 보여주는 것
          //현재 보고 있는 파일을 보여줬다 안보여줬다하면서 넘기게 만듬
          <File key={file.id} src={file.url} showing={index === currentItem} />
        ))}
    </Files>
    <Meta>
      {/* 버튼 */}
      <Buttons>
        {/* 좋아요 버튼 (누를시 토글) */}
        <Button onClick={toggleLike}>
          {/* 좋아요를 체크한 경우 색이 칠해져 있는 하트 아닌 경우 빈 하트 아이콘 */}
          {isLiked ? <HeartFull /> : <HeartEmpty />}
        </Button>
        {/* 댓글 버튼 */}
        <Button>
          <Comment />
        </Button>
      </Buttons>
      {/* 좋아요 수 텍스트 */}
      <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
      <Timestamp>{createdAt}</Timestamp>
      {/* 텍스트를 쓸 수 있는 공간(TextAutoSize) */}
      <Textarea placeholder={"Add a comment..."} {...newComment} />
    </Meta>
  </Post>
);
