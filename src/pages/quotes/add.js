import React, { useMemo } from 'react';
import { Input, Txt, Tabs, Tab, Button } from 'rendition';
import { useForm } from 'react-hook-form';
import { useObjectVal } from 'react-firebase-hooks/database';
import firebase from 'gatsby-plugin-firebase';
import Layout from 'components/layout';
import Quotes from 'components/quotes';
const Title = ({ children, ...rest }) => (
  <Txt.span italic {...rest}>
    {children}
  </Txt.span>
);

const LabledInput = ({ title, refProp, ...rest }) => (
  <label>
    <Title ml={2}>{title}</Title>
    <Input m={2} ref={refProp} {...rest} />
  </label>
);

const TxtQuoteForm = props => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    const aaa = {
      type: 'text',
      data: {
        created_at: Date.now(),
        text: data.text,
        retweet_count: 13,
        favorite_count: 37,
        user: {
          name: data.name,
          screen_name: data.screen_name,
          profile_image_url:
            data.profile_image_url ||
            'https://avatars0.githubusercontent.com/u/22551311?s=400&u=5e88d2b51ca22fcc162cc0df526951131d12214d&v=4',
        },
      },
    };
    props.databaseRef.set(props.quotes.concat(aaa));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LabledInput title='Name' name='name' refProp={register} />
      <LabledInput title='Text' name='text' refProp={register} />
      <LabledInput
        title='Avatar url'
        name='profile_image_url'
        refProp={register}
      />
      <LabledInput title='Screen name' name='screen_name' refProp={register} />
      <Button type='submit'>Submit</Button>
    </form>
  );
};

const Page = ({ data }) => {
  const database = useMemo(() => firebase?.database(), [firebase]);
  const [quotes, isLoading] = useObjectVal(database?.ref('quotes'));
  const ref = useMemo(() => database?.ref('quotes'), [database]);
  console.log({ quotes });
  return (
    <Layout>
      <Tabs>
        <Tab title='Txt'>
          <TxtQuoteForm quotes={quotes} databaseRef={ref} />
        </Tab>
        <Tab title='Video'></Tab>
        <Tab title='Image'></Tab>
      </Tabs>
    </Layout>
  );
};

export default Page;
