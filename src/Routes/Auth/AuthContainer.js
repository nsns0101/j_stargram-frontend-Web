//로그인 값 설정
import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";

export default () => {
  const [action, setAction] = useState("login");
  const username = useInput(""); //닉네임
  const firstName = useInput(""); //성
  const lastName = useInput(""); //이름
  const email = useInput(""); //이메일
  //useMutation사용법은 https://www.apollographql.com/docs/react/api/react-hooks/#usemutation 참고
  //왜 [requestSecret]로 사용하는지? = 정해진 문법(그냥 requestSecret를 콘솔찍어보면 2개가 출력되서? )
  const [requestSecret] = useMutation(LOG_IN, {
    variables: { email: email.value }
  });
  const onLogin = e => {
    e.preventDefault();
    //email이 null이 아니면
    if (email !== "") {
      requestSecret(); //requestSecret() 실행
    }
  };

  return (
    <AuthPresenter
      setAction={setAction} //login 상태를 바꿀 수 있는 함수
      action={action} //login 상태
      username={username} //닉네임
      firstName={firstName} //성
      lastName={lastName} //이름
      email={email} //이메일
      onLogin={onLogin}
    />
  );
};
