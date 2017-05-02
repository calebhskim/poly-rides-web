import React from 'react';
import * as firebase from 'firebase';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, IndexRoute, IndexRedirect, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import About from './components/About';
import Account from './components/Account';
import App from './containers/app';
import config from './config';
import Contact from './components/Contact';
import Feed from './components/Feed';
import initialState from './constants/initialState';
import Landing from './components/Landing';
import lifecycles from './constants/lifecycles';
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

// prevents not logged in users and users that aren't in the fb group
// from accessing page
const authCheck = reduxStore => (nextState, replace) => {
  const { auth: { lifecycle } } = reduxStore.getState();

  /* const { auth: { lifecycle, user: { inGroup } } } = reduxStore.getState();
   if (lifecycle === lifecycles.AUTH_NOT_LOGGEDIN || !inGroup) {
   using auth checking without validating that they are in the right group
   for now becuase it isn't working
   will be addressed in this card: https://trello.com/c/kmvHEGzd */
  if (lifecycle === lifecycles.AUTH_NOT_LOGGEDIN) {
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
      <Route path='/' component={App}>
        <IndexRoute component={Landing} />
        <Route path='about' component={About} />
        <Route path='contact' component={Contact} />
        <Route path='dashboard' component={Account} onEnter={authCheck(store)}>
          <IndexRedirect to='feed' />
          <Route path='feed' component={Feed} />
        </Route>
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
