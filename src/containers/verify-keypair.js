import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import tweetnaclUtil from 'tweetnacl-util';
import { verifyKeypair, resetVerificationState } from '../actions/index';
import SuccessMessage from '../components/success-message';

class VerifyKeypair extends Component {

  onSubmit(props) {
    console.log('verifying keypair.... on submitting the password form...');
    console.log(props);

    const reader = new FileReader();
    const uploadedFile = props.keypairBundle[0];

    reader.onload = function (inputFile) {
      const encodedBase64data = JSON.parse(inputFile.target.result);
      const decodedKeyPair = {
        publicKey: tweetnaclUtil.decodeBase64(encodedBase64data.publicKey),
        secretKeyBundle: {
          blockSize: encodedBase64data.secretKeyBundle.blockSize,
          dkLen: encodedBase64data.secretKeyBundle.dkLen,
          interruptStep: encodedBase64data.secretKeyBundle.interruptStep,
          logN: encodedBase64data.secretKeyBundle.logN,
          encryptedSecretKey: tweetnaclUtil.decodeBase64(encodedBase64data.secretKeyBundle.encryptedSecretKey),
          nonce: tweetnaclUtil.decodeBase64(encodedBase64data.secretKeyBundle.nonce),
          salt: tweetnaclUtil.decodeBase64(encodedBase64data.secretKeyBundle.salt)
        }
      };
      this.props.verifyKeypair(props.password, decodedKeyPair);
    }.bind(this);
    reader.readAsText(uploadedFile);
  }

  resetVerifyPage() {
    this.props.resetForm();
    this.props.resetVerificationState();
  }

  checkValidation(field) {
    return `form-group ${(field.touched && field.invalid) ? 'has-error' : ''}`;
  }

  render() {
    console.log('rendering VerifyKeypair form...');
    console.log(this.props);
    const { fields: { keypairBundle, password }, handleSubmit } = this.props;

    let content;
    if (this.props.encryptionKeys.keypair) {
      if (this.props.encryptionKeys.verified) {
        content = <SuccessMessage type="success" icon="check" message="Great! Your keypair has been verified." reset={this.resetVerifyPage.bind(this)}/>;
      } else {
        content = <SuccessMessage type="danger" icon="times" message="Verification of your keypair failed." reset={this.resetVerifyPage.bind(this)}/>;
      }
    } else {
      content = (
        <div>
          <p className="text-center">Here you can verify that your password decrypts your secretkey.</p>
          <hr />
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className={this.checkValidation(keypairBundle)}>
                  <label htmlFor="title">Upload your keypair (.json) file.</label>
                  <input type="file" accept=".json" {...keypairBundle} value={undefined} />
                  <div className="help-block">{ (keypairBundle.touched && keypairBundle.error) ? keypairBundle.error : '' }</div>
                </div>
                <div className={this.checkValidation(password)}>
                  <label htmlFor="title">Password</label>
                  <input type="password" className="form-control" id="password" {...password} />
                  <div className="help-block">{ (password.touched && password.error) ? password.error : '' }</div>
                </div>
                <button className="btn btn-primary btn-lg center-block">Verify keypair</button>
              </form>
        </div>
        </div>
        </div>
      );
    }

    return (
      <div className="jumbotron verify-keypair row">
      <div className="col-md-10 col-md-offset-1">
      <h1 className="text-center">Verify Your Keypair</h1>
      {content}
      </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  console.log(values);

  if (!values.keypairBundle) {
    errors.keypairBundle = 'Upload your keypair file.';
  }

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
  fields: ['keypairBundle', 'password'],
  validate }, mapStateToProps, { verifyKeypair, resetVerificationState })(VerifyKeypair);
