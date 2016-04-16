import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createKeypair } from '../actions/index';
import { saveAs } from 'filesaverjs';

class CreateKeypair extends Component {

  onSubmit(props) {
    console.log('generate keypair.... on submitting the password form...');
    this.props.createKeypair(props.password);
  }

  checkValidation(field) {
    return `form-group ${(field.touched && field.invalid) ? 'has-error' : ''}`;
  }

  saveKeypairToDisk() {
    const blob = new Blob([JSON.stringify(this.props.encryptionKeys.keypair)], {type : 'application/json'});
    saveAs(blob, 'keypair.json');
  }

  render() {
    // console.log('rendering CreateKeypair form...');
    // console.log('encryptionKeys props', this.props.encryptionKeys);
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
                  <input type="text" className="form-control" id="password" {...password} />
                  <div className="help-block">{ (password.touched && password.error) ? password.error : '' }</div>
                </div>
                <div className={this.checkValidation(passwordConfirmation)}>
                  <label htmlFor="title">Password confirmation</label>
                  <input type="text" className="form-control" id="passwordConfirmation" {...passwordConfirmation} />
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
  return { encryptionKeys: state.keys };
}

export default reduxForm({
  form: 'CreateKeypair',
  fields: ['password', 'passwordConfirmation'],
  validate }, mapStateToProps, { createKeypair })(CreateKeypair);
