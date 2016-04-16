import { CREATE_KEYPAIR, CREATED_KEYPAIR } from '../actions/index';

const INITIAL_STATE = {
  keypair: null,
  generatingKeys: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_KEYPAIR:
    console.log('action', action);
    return { ...state, generatingKeys: true };
    case CREATED_KEYPAIR:
    console.log('action', action);
    return { ...state, keypair: action.payload, generatingKeys: false };
    default:
    return state;
  }
}
