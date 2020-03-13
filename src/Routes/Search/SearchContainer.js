import React from "react";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./SearchQueries";

//withRouter는 render props : { match, location, history } 와 같은 props로써 경로가 변경 될 때마다 해당 구성 요소를 다시 렌더링합니다
export default withRouter(({ location: { search } }) => {
  // console.log(search);   //?term={검색한 값}
  const term = search.split("=")[1]; //[1] = {검색한 값},   [0] = ?term
  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined, //term이 undefined라면 SEARCH Query를 skip
    variables: {
      term
    }
  });
  return (
    <SearchPresenter
      searchTerm={term} //검색한 값
      loading={loading} //로딩 여부
      data={data} //검색 결과
    />
  );
});
