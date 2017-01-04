import React from 'react';
import * as firebase from 'firebase';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './containers/app';
import About from './components/about';
import Dashboard from './components/dashboard';
import lifecycles from './constants/lifecycles';
import Login from './components/login';
import NotFound from './components/notFound';
import config from './config';
import Store from './store';
import serverInit from './actions/serverInit';

const fbApp = firebase.initializeApp(config.firebase);

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.PRELOADED_STATE;

// Create Redux store with initial state
const store = new Store(preloadedState);

// Sync history with redux store for react router
const history = syncHistoryWithStore(browserHistory, store);

const authCheck = (nextState, replace) => {
  if (store.getState().auth.lifecycle === lifecycles.AUTH_NOT_LOGGEDIN) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

store.dispatch(serverInit(fbApp));
render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
        <Route path='/' component={Login} />
        <Route path='/about' component={About} />
        <Route path='/dashboard/:id' component={Dashboard} onEnter={authCheck} />
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
