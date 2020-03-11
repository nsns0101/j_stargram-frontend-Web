//로그인 값 설정
import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
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

  //입력 Form을 제출하는 함수
  const onSubmit = async e => {
    console.log(action);
    e.preventDefault();
    //로그인 버튼을 클릭하였을 때
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
    //회원가입 버튼을 클릭하였을 때
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

// //LOG_IN을 실행하고 난 값이 data에 담기는 듯
//   //LOG_IN은 AuthQueries.js에서 requestSecret니까 그 리턴 값(Boolean)이 data에 담김
//   update: (_, { data }) => {
//     // console.log(data);
//     const { requestSecret } = data;
//     //요청한 이메일이 DB에 없을 때
//     if (!requestSecret) {
//       //계정이 없으면 생성하라는 오류 창 생성
//       toast.error("You dont have an account yet, create one");
//       //3초 후 회원가입 폼으로 이동
//       setTimeout(() => setAction("signUp"), 3000);
//     }
//   },
