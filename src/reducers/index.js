import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import EncryptionKeysReducer from './encryption-keys';

const rootReducer = combineReducers({
  form: formReducer,
  keys: EncryptionKeysReducer
});

export default rootReducer;
