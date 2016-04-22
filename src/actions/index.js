import tweetnacl from 'tweetnacl';
import secretkeyEncryption from 'secretkey-encryption';

export const CREATE_KEYPAIR = 'CREATE_KEYPAIR';
export const CREATED_KEYPAIR = 'CREATED_KEYPAIR';
export const VERIFIED_KEYPAIR = 'VERIFIED_KEYPAIR';
export const RESET_VERIFICATION = 'RESET_VERIFICATION';
export const RESET_CREATE = 'RESET_CREATE';

export function resetVerificationState() {
  return {
    type: RESET_VERIFICATION
  };
}

export function resetCreateState() {
  return {
    type: RESET_CREATE
  };
}

export function createKeypair(password) {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_KEYPAIR });
    const keypair = tweetnacl.sign.keyPair();
    secretkeyEncryption.encryptSecretKey(password, keypair.secretKey)
    .then((secretKeyBundle) => {
      const obj = { publicKey: keypair.publicKey, secretKeyBundle };
    //  setTimeout(() => {
        dispatch({
          type: CREATED_KEYPAIR,
          payload: obj
        });
    //  }, 5000);
    });
  };
}

export function verifyKeypair(password, encryptedSecretKeyBundle) {
  return (dispatch, getState) => {
    secretkeyEncryption.decryptEncryptedSecretKey(password, encryptedSecretKeyBundle.secretKeyBundle)
    .then((secretKey) => {
      dispatch({
        type: VERIFIED_KEYPAIR,
        payload: {
          keypair: secretKey,
          verified: true
        }
      });
    })
    .catch((error) => {
      dispatch({
        type: VERIFIED_KEYPAIR,
        payload: {
          keypair: encryptedSecretKeyBundle,
          verified: false
        }
      });
    });
  };
}
