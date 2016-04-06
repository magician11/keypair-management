import React from 'react';
import { Route, IndexRoute } from 'react-router';
import KeypairManagement from './components/keypair-management';
import Intro from './components/intro';

export default (
  <Route path="/" component={KeypairManagement}>
    <IndexRoute component={Intro} />
  </Route>
);
