import React from 'react';
import * as firebase from 'firebase';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import About from './components/About';
import Account from './components/Account';
import App from './containers/App';
import config from './config';
import initialState from './constants/initialState';
import lifecycles from './constants/lifecycles';
import Login from './components/Login';
import NotFound from './components/NotFound';
import serverInit from './actions/serverInit';
import Store from './store';

const fbApp = firebase.initializeApp(config.firebase);

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.PRELOADED_STATE || initialState;

// Create Redux store with initial state
const store = new Store(preloadedState);

// Sync history with redux store for react router
const history = syncHistoryWithStore(browserHistory, store);

const authCheck = reduxStore => (nextState, replace) => {
  if (reduxStore.getState().auth.lifecycle === lifecycles.AUTH_NOT_LOGGEDIN) {
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
        <Route path='/dashboard' component={Account} onEnter={authCheck(store)} />
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
