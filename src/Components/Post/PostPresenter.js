//게시글
import React from "react";
import styled from "styled-components";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { HeartFull, HeartEmpty, Comment } from "../Icons";

const Post = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
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

const Files = styled.div``;

const File = styled.img`
  max-width: 100%;
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

export default ({
  user: { username, avatar },
  location,
  files,
  isLiked,
  likeCount,
  createdAt
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
        files.map(file => <File key={file.id} id={file.id} src={file.url} />)}
    </Files>
    <Meta>
      {/* 버튼 */}
      <Buttons>
        {/* 좋아요 버튼 */}
        <Button>{isLiked ? <HeartFull /> : <HeartEmpty />}</Button>
        {/* 댓글 버튼 */}
        <Button>
          <Comment />
        </Button>
      </Buttons>
      <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
      <Timestamp>{createdAt}</Timestamp>
    </Meta>
  </Post>
);
