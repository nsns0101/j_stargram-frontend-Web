//로그인
import React, { useState } from "react";
import styled from "styled-components";

//auth전체를 감싸는 것
const Wrapper = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

//로그인 박스
const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius:0px;
  width: 350px;
`;

//회원가입인지 로그인인지의 상태 체인저
const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

//
const Link = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;

export default () => {
  const [action, setAction] = useState("login");

  return (
    <Wrapper>
      <StateChanger>
        {/* 로그인 페이지면 */}
        {action === "logIn" ? (
          <>
            Don't have an account? {/* 링크 클릭시 SignUp Form으로 */}
            <Link onClick={() => setAction("signUp")}>Sign up</Link>
          </>
        ) : (
          <>
            Have an account? {/* 링크 클릭시 Login Form으로 */}
            <Link onClick={() => setAction("logIn")}>Log in</Link>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
};
