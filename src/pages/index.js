import Layout from 'components/layout';
import Timeline from 'components/timeline';
import {
  graphql,
} from 'gatsby';
import React from 'react';

const Page = ({data}) => <Layout>
  <div
    dangerouslySetInnerHTML={{
      __html: data.timelineJson.content.childMarkdownRemark.html,
    }}
  />
  <Timeline />
</Layout>;
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
