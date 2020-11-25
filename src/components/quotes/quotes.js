import React from 'react';
import { Flex, Box } from 'rendition';
import ReactPlayer from 'react-player';
import Tweet from 'react-tweet';
import { Card, Button, Avatar } from 'rendition';

const mapTweetFromDatabase = rawData => ({
  created_at: Date(rawData.added_at),
  text: rawData.text,
  user: {
    name: 'Twitter API',
    screen_name: 'TwitterAPI',
    profile_image_url:
      'https://avatars1.githubusercontent.com/u/19683412?s=400&u=fcad46689aa50eb5773503e59b2b066d5ec5b414&v=4',
  },
  retweet_count: 13,
  favorite_count: 37,
});

const tweetData = {
  created_at: 'Sun Nov 14 2020 20:42:56 GMT+0300 (Москва, стандартное время)',
  text:
    'To make room for more expression, we will now count all emojis as equal—including those with gender‍‍‍ and skin t… https://t.co/MkGjXf9aXm',
  user: {
    name: 'Twitter API',
    screen_name: 'TwitterAPI',
    profile_image_url:
      'https://avatars1.githubusercontent.com/u/19683412?s=400&u=fcad46689aa50eb5773503e59b2b066d5ec5b414&v=4',
  },
  retweet_count: 13,
  favorite_count: 37,
};

export const Quotes = ({ data }) => {
  return (
    <Flex alignItems='center' flexDirection='column'>
      {data.map(({ type, url, data }) => (
        <Box mt={3} mb={3}>
          {
            {
              video: (
                <Box width={['100%', '75vw', 588]}>
                  <ReactPlayer height='100%' width='100%' url={url} />
                </Box>
              ),
              text: <Tweet data={data} />,
              image: (
                <Box
                  maxWidth={['100%', '75vw', 588]}
                  style={{ backgroundImage: url }}
                />
              ),
            }[type]
          }
        </Box>
      ))}
    </Flex>
  );
};

export default Quotes;
