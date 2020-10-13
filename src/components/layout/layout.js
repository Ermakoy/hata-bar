import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'rendition';

import Head from 'components/head';
import Header from 'components/header';
import GlobalStyle from 'global.css.js';

import Footer, { Contacts } from 'components/footer';
import theme from 'constants/theme';

import { Content, Container } from './layout.css';

const Layout = ({ data, children }) => (
  <>
    <GlobalStyle />
    <Head />
    <Provider>
      <ThemeProvider theme={theme}>
        <Container>
          <Content>{children}</Content>
          <Footer />
        </Container>
      </ThemeProvider>
    </Provider>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
};

export default Layout;
