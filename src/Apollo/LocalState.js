export const defaults = {
  isLoggedIn: Boolean(localStorage.getItem("token")) || false
};

export const resolvers = {
  Mutation: {
    //로그인
    logUserIn: (_, { token }, { cache }) => {
      //localStorage와 sessionStorage가 있는데
      //둘다 사용자 로컬의 Storage객체에 접근할 수 있게 해줌
      //localStorage는 저장된 데이터에 만료기한이 없지만 sessionStorage는 만료기한이 있음(브라우저가 종료되면 지워짐)
      localStorage.setItem("token", token); //받은 토큰 값으로 로컬에 토큰생성
      cache.writeData({
        data: {
          isLoggedIn: true
        }
      });
      return null;
    },
    //로그아웃
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem("token"); //로컬에 있는 토큰을 삭제
      window.location.reload(); //페이지 새로고침
      return null;
    }
  }
};
