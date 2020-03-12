//피드
import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../Components/Loader";
import { FEED_QUERY } from "./FeedQueries";

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
  //로딩중일 때는 로고가 표시되도록
  return <Wrapper>{loading && <Loader />}</Wrapper>;
};
