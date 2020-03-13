import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";

const Wrapper = styled.div`
  height: 50vh;
  text-align: center;
`;

const SearchPresenter = ({ searchTerm, loading }) => (
  <Wrapper>
    {/* searchTerm이 undefined면 어떤 것을 찾으십니까? 를 리턴 */}
    {searchTerm === undefined && <FatText text={"Search for something?"} />}
  </Wrapper>
);

//유효성 검사
SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool
};

export default SearchPresenter;
