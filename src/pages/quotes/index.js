import React, { useMemo } from 'react';
import { useObjectVal } from 'react-firebase-hooks/database';
import firebase from 'gatsby-plugin-firebase';
import Layout from 'components/layout';
import Quotes from 'components/quotes';

const Page = ({ data }) => {
  const [quotesRaw, isLoading] = useObjectVal(
    firebase?.database().ref('quotes')
  );
  const quotes = useMemo(() => quotesRaw?.filter(Boolean) || [], [quotesRaw]);
  return (
    <Layout>
      <Quotes data={quotes} />
    </Layout>
  );
};

export default Page;
