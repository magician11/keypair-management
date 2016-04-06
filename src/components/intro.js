import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default () => {
  return (
    <Jumbotron className="text-center">
      <h1>Keypair Management</h1>
      <p>An app to generate and manage a keypair used for encryption and signing.</p>
      <p><LinkContainer to={{ pathname: '/generate' }}><Button bsStyle="primary" bsSize="large">Generate your keypair</Button></LinkContainer></p>
    </Jumbotron>
  );
};
