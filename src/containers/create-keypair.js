import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createKeypair, resetCreateState } from '../actions/index';
import { saveAs } from 'filesaverjs';
import tweetnaclUtil from 'tweetnacl-util';

class CreateKeypair extends Component {

  onSubmit(props) {
    this.props.createKeypair(props.password);
  }

  resetCreatePage() {
    this.props.resetForm();
    this.props.resetCreateState();
  }

  checkValidation(field) {
    return `form-group ${(field.touched && field.invalid) ? 'has-error' : ''}`;
  }

  saveKeypairToDisk() {
    const unencodedKeypair = this.props.encryptionKeys.keypair;
    const base64EncodedKeyPair = {
      publicKey: tweetnaclUtil.encodeBase64(unencodedKeypair.publicKey),
      secretKeyBundle: {
        blockSize: unencodedKeypair.secretKeyBundle.blockSize,
        dkLen: unencodedKeypair.secretKeyBundle.dkLen,
        interruptStep: unencodedKeypair.secretKeyBundle.interruptStep,
        logN: unencodedKeypair.secretKeyBundle.logN,
        encryptedSecretKey: tweetnaclUtil.encodeBase64(unencodedKeypair.secretKeyBundle.encryptedSecretKey),
        nonce: tweetnaclUtil.encodeBase64(unencodedKeypair.secretKeyBundle.nonce),
        salt: tweetnaclUtil.encodeBase64(unencodedKeypair.secretKeyBundle.salt)
      }
    };
    const blob = new Blob([JSON.stringify(base64EncodedKeyPair)], { type: 'application/json' });
    saveAs(blob, 'keypair.json');
  }

  render() {
    const { fields: { password, passwordConfirmation }, handleSubmit } = this.props;

    let content;
    if (this.props.encryptionKeys.generatingKeys) {
      content = (
        <div>
          <i className="fa fa-cog fa-spin fa-5x"></i>
          <h3>generating your keypair</h3>
          <span className="sr-only">Loading...</span>
        </div>
      );
    } else if (this.props.encryptionKeys.keypair) {
      content = (
        <div>
          <p>You may now download your encryption keypair.</p>
          <button className="btn btn-success btn-lg" onClick={this.saveKeypairToDisk.bind(this)}><i className="fa fa-download"></i> Download keypair</button>
          <button className="btn btn-info center-block" onClick={this.resetCreatePage.bind(this)}><i className="fa fa-undo" aria-hidden="true"></i> Generate a new keypair</button>
        </div>
      );
    } else {
      content = (
        <div>
          <p>This section will create you a keypair, encrypt the secret key with the password you enter, and provide it to you as a downloadable zip.</p>
          <p>Simply enter a password, confirm it, and hit the button below.</p>
          <hr />
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className={this.checkValidation(password)}>
                  <label htmlFor="title">Password</label>
                  <input type="password" className="form-control" id="password" {...password} />
                  <div className="help-block">{ (password.touched && password.error) ? password.error : '' }</div>
                </div>
                <div className={this.checkValidation(passwordConfirmation)}>
                  <label htmlFor="title">Password confirmation</label>
                  <input type="password" className="form-control" id="passwordConfirmation" {...passwordConfirmation} />
                  <div className="help-block">{ (passwordConfirmation.touched && passwordConfirmation.error) ? passwordConfirmation.error : '' }</div>
                </div>
                <button className="btn btn-primary btn-lg">Generate my keypair</button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="jumbotron text-center create-keypair row">
      <div className="col-md-10 col-md-offset-1">
      <h1>Generate A Keypair</h1>
      {content}
      </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.password) {
    errors.password = 'Please enter a password to sign the secret key with.';
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Please confirm your password.';
  }
  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Your confirmation password does not match. Please double check and re-enter them.';
  }

  return errors;
}

function mapStateToProps(state) {
  return { encryptionKeys: state.keys.create };
}

export default reduxForm({
  form: 'CreateKeypair',
  fields: ['password', 'passwordConfirmation'],
  validate }, mapStateToProps, { createKeypair, resetCreateState })(CreateKeypair);
