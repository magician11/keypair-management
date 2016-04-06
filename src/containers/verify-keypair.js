import React from 'react';
import { Panel } from 'react-bootstrap';

const title = (
  <h3>Coming soon...</h3>
);

export default () => {
  return (
    <Panel header={title}>
      This page will verify a keypair.
    </Panel>
  );
};
