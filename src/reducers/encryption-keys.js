import { CREATE_KEYPAIR } from '../actions/index';

const INITIAL_STATE = {
  pulicKey: null,
  secretKey: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_KEYPAIR:
    return { publicKey: action.payload.publicKey, secretKey: action.payload.secretKey };
    default:
    return state;
  }
}
