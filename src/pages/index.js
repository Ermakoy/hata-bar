import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Markdown } from 'rendition/dist/extra/Markdown';

import Layout from 'components/layout';
import Box from 'components/box';

const Main = styled.main`
  font-size: calc(1em + 1vw);
  max-width: 30em;

  del {
    color: rgba(0, 0, 0, 0.2);
    transition: color 0.2s;

    &:hover {
      color: rgba(0, 0, 0, 0.4);
    }
  }
`;

const Index = ({ data }) => (
  <Layout>
    <Box maxWidth={1200}>
      <Main>
        <Markdown>{data.homeJson.content.childMarkdownRemark.rawMarkdownBody}</Markdown>
      </Main>
    </Box>
  </Layout>
);

Index.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Index;

export const query = graphql`
  query HomepageQuery {
    homeJson {
      title
      content {
        childMarkdownRemark {
          html
          rawMarkdownBody
        }
      }
      gallery {
        title
        copy
        image {
          childImageSharp {
            fluid(maxHeight: 500, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
