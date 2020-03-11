//라우터
import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import Auth from "../Routes/Auth/index.js";
import Feed from "../Routes/Feed";

//로그인 상태의 홈
const LoggedInRoutes = () => (
  <>
    <Route exact path="/" component={Feed} />
  </>
);

//로그아웃 상태의 홈
const LoggedOutRoutes = () => (
  <>
    <Route exact path="/" component={Auth} />
  </>
);

const AppRouter = ({ isLoggedIn }) => (
  <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Switch>
);

//유효성 검사
AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;
