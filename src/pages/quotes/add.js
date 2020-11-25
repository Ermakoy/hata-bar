import React, { useMemo, useCallback } from 'react';
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

function TxtQuoteForm(props) {
  const { register, handleSubmit } = useForm();
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
    props.addQuote(aaa);
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
}

function VideoQuoteForm(props) {
  const { register, handleSubmit } = useForm();
  function onSubmit({ url }) {
    const wrappedData = {
      type: 'video',
      url,
    };
    props.addQuote(wrappedData);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LabledInput title='Img url' name='url' refProp={register} />
      <Button type='submit'>Submit</Button>
    </form>
  );
}

function ImageQuoteForm(props) {
  const { register, handleSubmit } = useForm();
  function onSubmit({ url }) {
    const wrappedData = {
      type: 'image',
      url,
    };
    props.addQuote(wrappedData);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LabledInput title='Img url' name='url' refProp={register} />
      <Button type='submit'>Submit</Button>
    </form>
  );
}

const Page = ({ data }) => {
  const database = useMemo(() => firebase?.database(), [firebase]);
  const [quotes] = useObjectVal(database?.ref('quotes'));
  const ref = useMemo(() => database?.ref('quotes'), [database]);
  const addQuote = useCallback(quote => ref.set(quotes.concat(quote)), [
    ref,
    quotes,
  ]);
  return (
    <Layout>
      <Tabs>
        <Tab title='Txt'>
          <TxtQuoteForm addQuote={addQuote} />
        </Tab>
        <Tab title='Video'>
          <VideoQuoteForm addQuote={addQuote} />
        </Tab>
        <Tab title='Image'>
          <ImageQuoteForm addQuote={addQuote} />
        </Tab>
      </Tabs>
    </Layout>
  );
};

export default Page;
