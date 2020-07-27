import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

//아바타 사이즈를 받는 함수
const getSize = size => {
  let number;
  //sm이면 30(small)
  if (size === "sm") {
    number = 30;
  }
  //md면 50(middle)
  else if (size === "md") {
    number = 50;
  }
  //lg면 150(large)
  else if (size === "lg") {
    number = 150;
  }
  //정사각형 사이즈를 리턴
  return `
        width:${number}px;
        height:${number}px;
        `;
};

const Container = styled.div`
  ${props => getSize(props.size)}
  background-image:url(${props => props.url});
  background-size:cover;
  border-radius:50%;
`;
//아바타 기본 사이즈은 sm
const Avatar = ({ size = "sm", url, className }) => (
  <Container className={className} size={size} url={url} />
);

//유효성검사
Avatar.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  url: PropTypes.string
};

export default Avatar;
