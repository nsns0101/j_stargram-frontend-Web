//로그인
import React, { useState } from "react";
import styled from "styled-components";
import Input from "../Components/Input";
import Button from "../Components/Button";
import useInput from "../Hooks/useInput";

//auth전체를 감싸는 것
const Wrapper = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

//로그인 박스
const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 350px;
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

// 회원가입, 로그인 폼
//안의 태그도 스타일을 함께 줄 수 있음
const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

export default () => {
  const [action, setAction] = useState("login");
  const username = useInput(""); //닉네임
  const password = useInput(""); //비밀번호
  const firstName = useInput(""); //성
  const lastName = useInput(""); //이름
  const email = useInput(""); //이메일
  return (
    <Wrapper>
      {/* 회원가입, 로그인 폼 */}
      <Form>
        {/* 현재 로그인 폼이면 */}
        {action === "logIn" ? (
          <form>
            {/* Input함수에 placeholder값과 여러 값들을 넣어서 함수실행 (Input.js 참고) */}
            <Input placeholder={"Username"} {...username} />
            <Input placeholder={"Password"} {...password} type="password" />
            <Button text={"Log in"} />
          </form>
        ) : (
          // 현재 회원가입 폼이면(밑의 상태체인저 참고)
          <form>
            {/* Input함수에 placeholder값 넣어서 함수실행 (Input.js 참고) */}
            <Input placeholder={"First name"} {...firstName} />
            <Input placeholder={"Last name"} {...lastName} />
            <Input placeholder={"Email"} {...email} type="email" />
            <Input placeholder={"Username"} {...username} />
            <Input placeholder={"Password"} {...password} type="password" />
            <Button text={"Sign up"} />
          </form>
        )}
      </Form>
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
