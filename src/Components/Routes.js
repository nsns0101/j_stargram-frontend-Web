//라우터
import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import Auth from "../Routes/Auth/index.js";
import Feed from "../Routes/Feed/Feed";
import Explore from "../Routes/Explore";
import Search from "../Routes/Search";
import Profile from "../Routes/Profile";

//로그인 상태
const LoggedInRoutes = () => (
  // Switch란 path="/about", path="/about/:name"라는 두개의 라우터가 있을 때 첫번째로 매칭되는 것만 선택하는 것
  //위의 두 라우터중 path="/about"가 앞에 있을 때 /about/123 으로 검색해도 첫번째로 매칭되는 /about만 잡아주니까
  //순서를 path="/about/:name", path="about"로 해야함.

  //여기서는 Switch를 사용하지 않으면 /search로 검색시 밑의 /:username까지 같이 사용됨
  <Switch>
    <Route exact path="/" component={Feed} /> {/* 홈 */}
    <Route path="/explore" component={Explore} />
    <Route path="/search" component={Search} />
    <Route path="/:username" component={Profile} /> {/* 프로필 보기 */}
  </Switch>
);

//로그아웃 상태의 홈
const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
  </Switch>
);

//로그인 했는지 안했는지를 판단하여 맞는 라우터로 보내줌
const AppRouter = ({ isLoggedIn }) => {
  return isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;
};

//유효성 검사
AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;
