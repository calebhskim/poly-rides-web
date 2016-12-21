import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/app';
import rootReducer from './reducers';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.PRELOADED_STATE;

// Create Redux store with initial state
const store = createStore(rootReducer, preloadedState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
