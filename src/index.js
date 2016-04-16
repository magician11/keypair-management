import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { Router, hashHistory } from 'react-router';
import reducers from './reducers';
import routes from './routes';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={ hashHistory } routes={ routes } />
  </Provider>, document.getElementById('keypair-management')
);
