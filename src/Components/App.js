import React from "react";
import GlobalStyles from "../Styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import Theme from "../Styles/Theme";
import AppRouter from "./Router";

export default () => (
  <ThemeProvider theme={Theme}>
    <>
      <GlobalStyles />
      <AppRouter isLoggedIn={false} />
    </>
  </ThemeProvider>
);
