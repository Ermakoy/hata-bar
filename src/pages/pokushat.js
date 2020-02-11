import React from 'react';
import { graphql } from 'gatsby';

import Layout from 'components/layout';
import Pokushat from 'components/pokushat';

const Page = ({ data }) => {
  return (
    <Layout>
      <Pokushat />
    </Layout>
  );
};

export default Page;

export const query = graphql`
  query TimelineQuery1337 {
    timelineJson {
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
