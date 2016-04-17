import tweetnacl from 'tweetnacl';
import secretkeyEncryption from 'secretkey-encryption';

export const CREATE_KEYPAIR = 'CREATE_KEYPAIR';
export const CREATED_KEYPAIR = 'CREATED_KEYPAIR';

export function createKeypair(password) {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_KEYPAIR });
    const keypair = tweetnacl.sign.keyPair();
    secretkeyEncryption.encryptSecretKey(password, keypair.secretKey)
    .then((secretKeyBundle) => {
      const obj = { publicKey: keypair.publicKey, secretKeyBundle };
      setTimeout(() => {
        console.log(`derived new key from password ${password}`);
        dispatch({
          type: CREATED_KEYPAIR,
          payload: obj
        });
      }, 5000);
    });
  };
}
