import React from "react";
import GlobalStyles from "../Styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

import Theme from "../Styles/Theme";
import AppRouter from "./Router";

//apolloClient에서 isLoggedIn을 불러옴
const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

export default () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);
  console.log(isLoggedIn);

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <AppRouter isLoggedIn={isLoggedIn} />
      </>
    </ThemeProvider>
  );
};
