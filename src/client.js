import React from 'react';
import * as firebase from 'firebase';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/app';
import config from './config';
import Store from './store';
import serverInit from './actions/serverInit';

firebase.initializeApp(config.firebase);

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.PRELOADED_STATE;

// Create Redux store with initial state
const store = new Store(preloadedState);

store.dispatch(serverInit({}));
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
