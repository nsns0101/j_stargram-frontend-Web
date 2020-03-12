//피드
import React from "react";
import { Helmet } from "rl-react-helmet";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../Components/Loader";
import { FEED_QUERY } from "./FeedQueries";
import Post from "../../Components/Post";

//로딩 로고를 가운데로
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

export default () => {
  //loading이 끝나야 data를 얻을 수 있음
  const { data, loading } = useQuery(FEED_QUERY);
  return (
    <Wrapper>
      <Helmet>
        <title>Feed | j_stargram</title>
      </Helmet>
      {/* 로딩중일 때는 로고가 표시되도록 */}
      {loading && <Loader />}
      {/* 로딩이 끝나고 */}
      {!loading &&
        // data에 값이 있고
        data &&
        //data의 seeFeed에 값들이 있으면
        data.seeFeed &&
        //게시글을 하나씩 만들어줌
        data.seeFeed.map(post => (
          <Post
            key={post.id}
            id={post.id}
            user={post.user}
            location={post.location}
            caption={post.caption}
            files={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            createdAt={post.createdAt}
          />
        ))}
    </Wrapper>
  );
};
