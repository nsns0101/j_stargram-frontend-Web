import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";

const Wrapper = styled.div`
  height: 50vh;
`;

const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;

const SearchPresenter = ({ searchTerm, loading, data }) => {
  //검색인데 검색을 하지 않았을 경우?
  if (searchTerm === undefined) {
    return (
      <Wrapper>
        <FatText text="Search for something" />
      </Wrapper>
    );
  }
  //로딩
  else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }
  //검색한 유저와 게시글이 있을 경우
  else if (data && data.searchUser && data.searchPost) {
    console.log(data); // {searchPost: Array(0), searchUser: Array(0)}
    console.log(data.searchUser); //[]
    console.log(data.searchPost); //[]
    return (
      <Wrapper>
        <Section>
          {/* 검색한 유저가 없을 때 */}
          {data.searchUser.length === 0 ? (
            <FatText text="No Users Found" />
          ) : (
            //검색한 유저가 있을 때
            data.searchUser.map(user => (
              <UserCard
                key={user.id}
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.avatar}
                isSelf={user.isSelf}
              />
            ))
          )}
        </Section>
        <Section>
          {/* 검색한 게시글이 없을 때 */}
          {data.searchPost.length === 0 ? (
            <FatText text="No Posts Found" />
          ) : (
            // 검색한 게시글이 있을 때
            // data.searchPost.map(post => null)
            <FatText text="No Users Found" />
          )}
        </Section>
      </Wrapper>
    );
  }
};
//유효성 검사
SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool
};

export default SearchPresenter;
