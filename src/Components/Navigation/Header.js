import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { Link, withRouter } from "react-router-dom";
import Input from "../Input";
import useInput from "../../Hooks/useInput";
import { Compass, HeartEmpty, User, Logo } from "../Icons";
import { useQuery } from "react-apollo-hooks";

//z-index는 수직 위치를 정하는 것
//z-index를 주지 않으면 헤더위에 로딩이 표시될 수 있음
const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${props => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

export const SEE_MY_PROFILE = gql`
  {
    seeMyProfile {
      username
    }
  }
`;

//withRouter는 render props : { match, location, history } 와 같은 props로써 경로가 변경 될 때마다 해당 구성 요소를 다시 렌더링합니다
// export default withRouter(props => {
//   console.log(props); //props에는 history, location, match가 있음
// })

// 그 중 history는 경로와 상관있는듯?
export default withRouter(({ history }) => {
  const search = useInput("");
  const { data, loading } = useQuery(SEE_MY_PROFILE);
  //loading때문에 data를 바로 받는 것이 undefined가 되는 것인가?
  //데이터를 받아오기 전에 화면이 렌더링되서 그런 것인지는 모르겠는데 loading상태일 때는 데이터가 undefined가 되니 조심!
  if (loading) return "";
  // console.log(data);
  const { seeMyProfile } = data;
  //Search함수
  const onSearchSubmit = e => {
    e.preventDefault();
    //history.push를 사용하면 그 경로로 보내줌
    history.push(`/search?term=${search.value}`);
  };

  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
            <Logo />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          {/* Search함수 실행 */}
          <form onSubmit={onSearchSubmit}>
            {/* 함수 실행값들 */}
            <SearchInput {...search} placeholder="Search" />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          {/* 탐색 */}
          <HeaderLink to="/explore">
            <Compass />
          </HeaderLink>
          {/* 알림 */}
          <HeaderLink to="/notifications">
            <HeartEmpty />
          </HeaderLink>
          {/* 내정보 */}
          {seeMyProfile ? (
            // 로그인 중이면 seeMyProfile이 있을 것이니  링크를 /:username형식으로 변경
            <HeaderLink to={seeMyProfile.username}>
              <User />
            </HeaderLink>
          ) : (
            //로그아웃 중에 내정보를 눌렀을 때
            <HeaderLink to="/#">
              <User />
            </HeaderLink>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});
