import React from 'react';
import styled from 'styled-components';

const ContactsItem = styled.li`
  display: inline-block;
  padding-bottom: 0.5em;
  padding-right: 0.5em;
  padding-top: 0.5em;
`;

export const Contacts = () => (
  <ul className="contacts">
    <ContactsItem>
      <a href="tel:89992409320">8 999 240 93 20</a>
    </ContactsItem>
    <ContactsItem>
      <a href="mailto:andrey@ermakoy.dev">andrey@ermakoy.dev</a>
    </ContactsItem>
    <ContactsItem>
      <a href="https://t.me/ermakoy">Телеграм</a>
    </ContactsItem>
    <ContactsItem>
      <a href="https://vk.com/ermakoy">ВК</a>
    </ContactsItem>
    <ContactsItem>
      <a href="https://github.com/ermakoy">Гитхаб</a>
    </ContactsItem>
    <ContactsItem>
      <a href="https://vk.cc/asLeHO">Резюме</a>
    </ContactsItem>
  </ul>
);

export default styled.footer`
  font-size: 0.85rem;
  margin-top: auto;
  padding-bottom: calc(1rem + 1vw);
  padding-top: calc(3rem + 1vw);
`;
