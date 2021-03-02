import theme from 'constants/theme';
import Head from 'components/head';
import Header from 'components/header';
import GlobalStyle from 'global.css.js';
import React from 'react';
import {
  Provider,
} from 'rendition';
import {
  ThemeProvider,
} from 'styled-components';
import {
  Content, Container,
} from './layout.css';

const Layout = ({children}) => <>
  <GlobalStyle />
  <Head />
  <ThemeProvider theme={theme}>
    <Provider>
      <Container>
        <Header />
        <Content>{children}</Content>
      </Container>
    </Provider>
  </ThemeProvider>
</>;
export default Layout;
