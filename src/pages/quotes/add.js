import Layout from 'components/layout';
import firebase from 'gatsby-plugin-firebase';
import React, {
  useMemo, useCallback,
} from 'react';
import {
  useObjectVal,
} from 'react-firebase-hooks/database';
import {
  useForm,
} from 'react-hook-form';
import {
  Input, Txt, Tabs, Tab, Button,
} from 'rendition';

const Span = Txt.span;

const Title = ({children, ...rest}) => <Span italic {...rest}>
  {children}
</Span>;
const LabledInput = ({title, refProp, ...rest}) => <label>
  <Title ml={2}>{title}</Title>
  <Input m={2} ref={refProp} {...rest} />
</label>;
function TxtQuoteForm (props) {
  const {register, handleSubmit} = useForm();
  const onSubmit = (data) => {
    const aaa = {
      data: {
        created_at: Date.now(),
        favorite_count: 37,
        retweet_count: 13,
        text: data.text,
        user: {
          name: data.name,
          profile_image_url:
            data.profile_image_url ||
            'https://avatars0.githubusercontent.com/u/22551311?s=400&u=5e88d2b51ca22fcc162cc0df526951131d12214d&v=4',
          screen_name: data.screen_name,
        },
      },
      type: 'text',
    };
    props.addQuote(aaa);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LabledInput name='name' refProp={register} title='Name' />
      <LabledInput name='text' refProp={register} title='Text' />
      <LabledInput
        name='profile_image_url'
        refProp={register}
        title='Avatar url'
      />
      <LabledInput name='screen_name' refProp={register} title='Screen name' />
      <Button type='submit'>Submit</Button>
    </form>
  );
}

function VideoQuoteForm (props) {
  const {register, handleSubmit} = useForm();
  function onSubmit ({url}) {
    const wrappedData = {
      type: 'video',
      url,
    };
    props.addQuote(wrappedData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LabledInput name='url' refProp={register} title='Img url' />
      <Button type='submit'>Submit</Button>
    </form>
  );
}

function ImageQuoteForm (props) {
  const {register, handleSubmit} = useForm();
  function onSubmit ({url}) {
    const wrappedData = {
      type: 'image',
      url,
    };
    props.addQuote(wrappedData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LabledInput name='url' refProp={register} title='Img url' />
      <Button type='submit'>Submit</Button>
    </form>
  );
}

const Page = ({data}) => {
  const database = firebase?.database();
  const [quotes] = useObjectVal(database?.ref('quotes'));
  const ref = useMemo(() => database?.ref('quotes'), [database]);
  const addQuote = useCallback((quote) => ref.set(quotes.concat(quote)), [
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
