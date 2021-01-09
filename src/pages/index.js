import React from 'react';
import { graphql } from 'gatsby';

import Layout from 'components/layout';
import Timeline from 'components/timeline';

const Page = ({ data }) => {
  return (
    <Layout>
      <div
        dangerouslySetInnerHTML={{
          __html: data.timelineJson.content.childMarkdownRemark.html,
        }}
      />
      <Timeline />
    </Layout>
  );
};

export default Page;

export const query = graphql`
  query timelineQuery {
    timelineJson {
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
