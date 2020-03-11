//로그인 폼
import React from "react";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

//auth전체를 감싸는 것
const Wrapper = styled.div`
  min-height: 80vh;
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

//AuthContainer에서 넘겨준 값들을 받아서
export default ({
  action,
  setAction,
  username,
  firstName,
  lastName,
  email,
  secret,
  onSubmit
}) => {
  //
  return (
    <Wrapper>
      <Form>
        {/* 현재 로그인 폼이면 */}
        {action === "login" && (
          <form onSubmit={onSubmit}>
            {/* Input함수에 placeholder값 + 여러 값들을 넣어서 함수실행 (Input.js 참고) */}
            <Input placeholder={"Email"} {...email} type="email" />
            <Button text={"Log in"} />
          </form>
        )}

        {/* 현재 회원가입 폼이면(밑의 상태체인저 참고) */}
        {action === "signUp" && (
          <form onSubmit={onSubmit}>
            {/* Input함수에 placeholder값 넣어서 함수실행 (Input.js 참고) */}
            <Input placeholder={"First name"} {...firstName} />
            <Input placeholder={"Last name"} {...lastName} />
            <Input placeholder={"Email"} {...email} type="email" />
            <Input placeholder={"Username"} {...username} />
            <Button text={"Sign up"} />
          </form>
        )}

        {/* 로그인 성공했으면  */}
        {action === "confirm" && (
          //이메일로 보내진 secret값을 입력하는 창이 만들어짐
          <form onSubmit={onSubmit}>
            <Input placeholder="Paste your secret" required {...secret} />
            <Button text={"Confirm"} />
          </form>
        )}
      </Form>
      <StateChanger>
        {/* 로그인 페이지면 */}
        {action === "login" ? (
          <>
            Don't have an account? {/* 링크 클릭시 SignUp Form으로 */}
            <Link onClick={() => setAction("signUp")}>Sign up</Link>
          </>
        ) : (
          <>
            Have an account? {/* 링크 클릭시 login Form으로 */}
            <Link onClick={() => setAction("login")}>Log in</Link>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
};
