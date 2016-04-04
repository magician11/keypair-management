import React, { Component, PropTypes } from 'react';
import tweetnacl from 'tweetnacl';

class CreateKeypair extends Component {
  constructor(props) {
    super(props);
  }

  generateKeyPair() {
    console.log('Generating keypair...');
    const keypair = tweetnacl.sign.keyPair();
    this.setState(keypair);
  }

  render() {
    console.log(this.state);
    return (
      <div className="jumbotron text-center create-keypair col-md-8 col-md-offset-2">
        <h1>Generate A Keypair</h1>
        <p>This app will create you a keypair, encrypt the secret key with the password you enter, and provide it to you as a downloadable zip.</p>
        <p>Simply enter a password and hit the button below.</p>
        <input className="form-control input-lg" type="password" placeholder="Your password to encrypt your secret key" />
        <button
          className="btn btn-primary btn-lg"
          onClick={this.generateKeyPair.bind(this)}
        >
          Generate my keypair
        </button>
      </div>
    );
  }
}

export default CreateKeypair;
