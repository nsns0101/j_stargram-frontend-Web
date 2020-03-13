//유저의 작은 프로필화면
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import Button from "./Button";

const Card = styled.div``;

const UserCard = ({ username, isFollowing, url, isSelf }) => (
  <Card>
    <Avatar url={url} />
    <FatText text={username} />
    {/* 검색한 것이 나 자신이 아니면 팔로우버튼 생성 */}
    {!isSelf && <Button text={isFollowing ? "Unfollow" : "Follow"} />}
  </Card>
);

UserCard.propTypes = {
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired
};

export default UserCard;
