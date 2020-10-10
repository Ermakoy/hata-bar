import React from 'react';
import AppProvider from 'store/provider';
import wrapPageElementWithTransition from 'helpers/wrapPageElement';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

// React Context in Browser
// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => {
  return <AppProvider>{element}</AppProvider>;
};

// Page Transitions
export const wrapPageElement = wrapPageElementWithTransition;
