import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'rendition';

import Head from 'components/head';
import Header from 'components/header';
import GlobalStyle from 'global.css.js';

import Footer, { Contacts } from 'components/footer';
import theme from '../../constants/theme';

import { Content, Container } from './layout.css';

const Layout = ({ data, children }) => (
  <>
    <GlobalStyle />
    <Head />
    <Provider>
      <ThemeProvider theme={theme}>
        <Container>
          <Header
            avatar={data.avatar.childImageSharp.fixed}
            title={data.site.siteMetadata.siteTitle}
          />
          <Content>{children}</Content>
          <Footer>
            <Contacts />
          </Footer>
        </Container>
      </ThemeProvider>
    </Provider>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
};

const LayoutWithQuery = props => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            siteTitle
          }
        }
        avatar: file(relativePath: { eq: "images/avatar.jpg" }) {
          childImageSharp {
            fixed(width: 80, height: 80) {
              base64
              src
              srcSet
              height
              width
            }
          }
        }
      }
    `}
    render={data => <Layout data={data} {...props} />}
  />
);

LayoutWithQuery.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutWithQuery;
