import React from 'react';
import { Route, IndexRoute } from 'react-router';
import KeypairManagement from './components/keypair-management';
import Intro from './components/intro';
import CreateKeypair from './containers/create-keypair';
import VerifyKeypair from './containers/verify-keypair';

export default (
  <Route path="/" component={KeypairManagement}>
    <IndexRoute component={Intro} />
    <Route path="/generate" component={CreateKeypair} />
    <Route path="/verify" component={VerifyKeypair} />
  </Route>
);
