import React from 'react';
import * as firebase from 'firebase';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import App from './containers/app';
import About from './components/about';
import NotFound from './components/notFound';
import config from './config';
import Store from './store';
import serverInit from './actions/serverInit';

const fbApp = firebase.initializeApp(config.firebase);

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.PRELOADED_STATE;

// Create Redux store with initial state
const store = new Store(preloadedState);

store.dispatch(serverInit(fbApp));
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
      <Route path='/about' component={About} />
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
