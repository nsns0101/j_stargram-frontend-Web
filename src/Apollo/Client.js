//백엔드 서버 설정
import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";
export default new ApolloClient({
  uri: "http://localhost:4000",
  clientState: {
    defaults,
    resolvers
  },
  //헤더에 토큰 넣어주기
  headers: {
    //localSotrage는 사용자 객체에 접근할 수 있는 것
    //자세한 내용은 같은 파일의 LocalState.js를 참고
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});
