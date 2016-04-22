import { CREATE_KEYPAIR, CREATED_KEYPAIR, VERIFIED_KEYPAIR, RESET_VERIFICATION, RESET_CREATE } from '../actions/index';

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
    return { ...state, create: { generatingKeys: true } };
    case CREATED_KEYPAIR:
    return { ...state, create: { keypair: action.payload, generatingKeys: false } };
    case VERIFIED_KEYPAIR:
    return { ...state, verify: action.payload };
    case RESET_VERIFICATION:
    return { ...state, verify: {keypair: null, verified: false } };
    case RESET_CREATE:
    return { ...state, create: {keypair: null, generatingKeys: false } };
    default:
    return state;
  }
}
