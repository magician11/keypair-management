import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Alert } from 'react-bootstrap';
import { verifyKeypair } from '../actions/index';

class VerifyKeypair extends Component {

  onSubmit(props) {
    console.log('verifying keypair.... on submitting the password form...');
    this.props.verifyKeypair(props.password, {todo: true});
  }

  checkValidation(field) {
    return `form-group ${(field.touched && field.invalid) ? 'has-error' : ''}`;
  }

  render() {
    console.log('rendering VerifyKeypair form...');
    const { fields: { password }, handleSubmit } = this.props;

    let content;
    if (this.props.encryptionKeys.keypair) {
      if(this.props.encryptionKeys.verified) {
        content = (
          <Alert bsStyle="success">
            <i className="fa fa-check" aria-hidden="true"></i> Great! Your keypair has been verified.
          </Alert>
        );
      } else {
        content = (
          <Alert bsStyle="danger">
            <i className="fa fa-times" aria-hidden="true"></i> Verification of your keypair failed.
          </Alert>
        );
      }
    } else {
      content = (
        <div>
        <p>Here you can verify your password works with your keypair.</p>
        <hr />
        <div className="row">
        <div className="col-md-8 col-md-offset-2">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className={this.checkValidation(password)}>
        <label htmlFor="title">Password</label>
        <input type="password" className="form-control" id="password" {...password} />
        <div className="help-block">{ (password.touched && password.error) ? password.error : '' }</div>
        </div>
        <button className="btn btn-primary btn-lg">Verify keypair</button>
        </form>
        </div>
        </div>
        </div>
      );
    }

    return (
      <div className="jumbotron text-center create-keypair row">
      <div className="col-md-10 col-md-offset-1">
      <h1>Verify Your Keypair</h1>
      {content}
      </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.password) {
    errors.password = 'Please enter the password you encrypted your secret key with.';
  }

  return errors;
}

function mapStateToProps(state) {
  return { encryptionKeys: state.keys.verify };
}

export default reduxForm({
  form: 'VerifyKeypair',
  fields: ['password'],
  validate }, mapStateToProps, { verifyKeypair })(VerifyKeypair);
