//input태그 역할
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

//인풋 상자
const Container = styled.input`
  border: 0;
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.bgColor};
  height: 35px;
  font-size: 12px;
  padding: 0px 15px;
`;

//input함수에 인자로 placeholder받은 값이 있으면 그 값을 Container태그의 placeholder값으로 주기
const Input = ({ placeholder }) => <Container placeholder={placeholder} />;

//유효성검사
Input.propTypes = {
  placeholder: PropTypes.string.isRequired
};

export default Input;
