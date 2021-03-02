import Layout from 'components/layout';
import Quotes from 'components/quotes';
import firebase from 'gatsby-plugin-firebase';
import React, {
  useMemo,
} from 'react';
import {
  useObjectVal,
} from 'react-firebase-hooks/database';

const Page = ({data}) => {
  const [quotesRaw] = useObjectVal(
    firebase?.database().ref('quotes'),
  );
  const quotes = useMemo(() => quotesRaw?.filter(Boolean) || [], [quotesRaw]);

  return (
    <Layout>
      <Quotes data={quotes} />
    </Layout>
  );
};

export default Page;
