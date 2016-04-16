import { CREATE_KEYPAIR, CREATED_KEYPAIR } from '../actions/index';

const INITIAL_STATE = {
  keypair: null,
  generatingKeys: false
};

export default function (state = INITIAL_STATE, action) {
  console.log('action', action);
  // console.log('state', state);
  switch (action.type) {
    case CREATE_KEYPAIR:
    return { ...state, generatingKeys: true };
    case CREATED_KEYPAIR:
    return { ...state, keypair: action.payload, generatingKeys: false };
    default:
    return state;
  }
}
