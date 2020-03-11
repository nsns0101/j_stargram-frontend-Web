//로그인 값 설정
import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN
} from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("login"); //action의 기본 값은 "login", action은 setAction함수로만 바꿀 수 있음
  const username = useInput(""); //닉네임
  const firstName = useInput(""); //성
  const lastName = useInput(""); //이름
  const email = useInput(""); //이메일
  const secret = useInput(""); //confirm 입력창

  //이메일로 로그인 요청
  //useMutation사용법은 https://www.apollographql.com/docs/react/api/react-hooks/#usemutation 참고
  //왜 [requestSecretMutation]로 사용하는지? = 정해진 문법(그냥 requestSecret를 콘솔찍어보면 2개가 출력되서? )
  const [requestSecretMutation] = useMutation(LOG_IN, {
    //LOG_IN 함수에 전달하게 될 값
    variables: { email: email.value }
  });

  //계정 생성 요청
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    //CREATE_ACCOUNT 함수에 전달하게 될 값
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });

  //입력한 confirm코드가 맞는지 판단 + 토큰 문자열 생성
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value
    }
  });
  //토큰 문자열을 실제 토큰으로 생성 및 로그인
  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  //입력 Form을 제출하는 함수(이 함수는 버튼을 눌렀을 때 실행)
  const onSubmit = async e => {
    console.log(action);
    e.preventDefault();
    //로그인 창이면
    if (action === "login") {
      //이메일이 입력되어 있으면
      if (email.value !== "") {
        //requestSecret함수 실행
        try {
          const {
            data: { requestSecret }
          } = await requestSecretMutation();
          //없는 계정이면
          if (requestSecret === false) {
            toast.error("You dont have an account yet, create one");
            setTimeout(() => setAction("signUp"), 3000);
          }
          //정상적인 로그인이면
          else {
            toast.success("Check your inbox for your login secret");
            //confirm 액션을 취하기
            setAction("confirm");
          }
        } catch {
          toast.error("Can't request secret, try again");
        }
        //이메일이 입력되어 있지 않으면
      } else {
        //이메일을 입력하라는 경고창 실행
        toast.error("Email is required");
      }
    }
    //회원가입 창이면
    else if (action === "signUp") {
      //모든 입력값에 입력을 하였을 때
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          //createAccount = 계정이 생성되었으면 true 아니면 false를 리턴받음
          const {
            data: { createAccount }
          } = await createAccountMutation();
          //계정이 생성되지 않았을 때
          console.log(createAccount);
          if (!createAccount) {
            //에러창 표시
            toast.error("Can't create account");
          }
          //계정이 생성되면
          else {
            //성공 알림창 표시
            toast.success("Account created! Log In now");
            //3초 후 login form으로 이동
            setTimeout(() => setAction("login"), 3000);
          }
        } catch (e) {
          toast.error(e.message);
        }
        //모든 값이 입력되어 있지 않으면 입력하라는 경고 실행
      } else {
        toast.error("All field are required");
      }
    }
    //confirm 코드 입력 창이면
    else if (action === "confirm") {
      //confirm 코드를 입력한 경우
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret: token }
          } = await confirmSecretMutation();
          //토큰 문자열이 있으면
          if (token !== "" && token !== undefined) {
            //로컬 로그인 실행(보낸 토큰문자열로 localLogInMutation에서 진짜 토큰으로 만들어줌)
            localLogInMutation({ variables: { token } });
          } else {
            throw Error("토큰 문자열이 왜 없지?");
          }
        } catch {
          toast.error("Cant confirm secret,check again");
        }
      }
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
      secret={secret}
      onSubmit={onSubmit} //입력 Form을 제출하는 함수
    />
  );
};
