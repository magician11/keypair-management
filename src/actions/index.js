import tweetnacl from 'tweetnacl';

export const CREATE_KEYPAIR = 'CREATE_KEYPAIR';

export function createKeypair() {
  const keypair = tweetnacl.sign.keyPair();

  return {
    type: CREATE_KEYPAIR,
    payload: keypair
  };
}
