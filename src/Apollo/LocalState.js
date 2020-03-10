export const defaults = {
  isLoggedIn: localStorage.getItem("token") !== null ? true : false
};

export const resolvers = {
  Mutation: {
    //로그인
    logUserIn: (_, { token }, { cache }) => {
      localStorage.setItem("token", token); //토큰생성
      cache.writeData({
        data: {
          isLoggedIn: true
        }
      });
      return null;
    },
    //로그아웃
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem("token"); //토큰삭제
      window.location.reload(); //페이지 새로고침
      return null;
    }
  }
};
