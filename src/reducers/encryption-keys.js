import { CREATE_KEYPAIR, CREATED_KEYPAIR, VERIFIED_KEYPAIR } from '../actions/index';

const INITIAL_STATE = {
  create: {
    keypair: null,
    generatingKeys: false
  },
  verify: {
    keypair: null,
    verified: false
  }
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_KEYPAIR:
    console.log('action', action);
    return { ...state, create: { generatingKeys: true } };
    case CREATED_KEYPAIR:
    console.log('action', action);
    return { ...state, create: { keypair: action.payload, generatingKeys: false } };
    case VERIFIED_KEYPAIR:
    console.log('action', action);
    return { ...state, verify: { verified: true } };
    default:
    return state;
  }
}
