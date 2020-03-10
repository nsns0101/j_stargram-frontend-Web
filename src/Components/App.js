import React from "react";
import GlobalStyles from "../Styles/GlobalStyles";
import styled, { ThemeProvider } from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Footer from "./Navigation/Footer";
import Theme from "../Styles/Theme";
import Routes from "./Router";

//apolloClient에서 isLoggedIn을 불러옴
const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 935px;
  width: 100%;
`;

export default () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);
  console.log(isLoggedIn);

  return (
    <ThemeProvider theme={Theme}>
      <Wrapper>
        <GlobalStyles />
        <Routes isLoggedIn={isLoggedIn} />
        {/* Footer */}
        <Footer />
      </Wrapper>
    </ThemeProvider>
  );
};
