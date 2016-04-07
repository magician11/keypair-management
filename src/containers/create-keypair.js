import React, { Component } from 'react';
import tweetnacl from 'tweetnacl';
import { reduxForm } from 'redux-form';

class CreateKeypair extends Component {
  onSubmit() {
    console.log('Generating keypair...');
    const keypair = tweetnacl.sign.keyPair();
    this.setState(keypair);
  }

  checkValidation(field) {
    return `form-group ${(field.touched && field.invalid) ? 'has-error' : ''}`;
  }


render() {
  const { fields: { password, passwordConfirmation }, handleSubmit } = this.props;
  return (
    <div className="jumbotron text-center create-keypair row">
      <div className="col-md-10 col-md-offset-1">
        <h1>Generate A Keypair</h1>
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

export default reduxForm({
  form: 'CreateKeypair',
  fields: ['password', 'passwordConfirmation'],
  validate }, null, null)(CreateKeypair);
