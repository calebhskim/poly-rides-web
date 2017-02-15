import get from 'lodash/get';

import actions from '../constants/actions';
import initialState from '../constants/initialState';
import lifecycles from '../constants/lifecycles';

const getUser = (payload) => {
  const {
    displayName,
    email,
    emailVerified,
    isAnonymous,
    photoURL,
    refreshToken,
    uid,
  } = payload;

  return({
    displayName,
    email,
    emailVerified,
    isAnonymous,
    photoURL,
    refreshToken,
    uid,
  });
};

const auth = (state = initialState.auth, { payload, response, type }) => {
  switch(type) {
    case actions.AUTH_LOGIN_START:
      return Object.assign({}, state, {
        lifecycle: lifecycles.AUTH_START,
      });
    case actions.AUTH_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        error: {},
        lifecycle: lifecycles.AUTH_LOGGEDIN,
        user: getUser(payload),
      });
    case actions.AUTH_LOGIN_FAILURE:
      return Object.assign({}, state, {
        error: payload,
        lifecycle: lifecycles.AUTH_NOT_LOGGEDIN,
      });
    case actions.AUTH_SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        error: {},
        lifecycle: lifecycles.AUTH_LOGGEDIN,
        user: getUser(payload),
      });
    case actions.AUTH_SIGNUP_FAILURE:
      return Object.assign({}, state, {
        error: payload,
        lifecycle: lifecycles.AUTH_NOT_LOGGEDIN,
      });
    case actions.AUTH_SIGNOUT_SUCCESS:
      return Object.assign({}, state, {
        error: {},
        lifecycle: lifecycles.AUTH_NOT_LOGGEDIN,
        user: {},
      });
    case actions.AUTH_SIGNOUT_FAILURE:
      return Object.assign({}, state, {
        error: payload,
        lifecycle: lifecycles.AUTH_SIGNOUT_FAILURE,
      });
    case actions.AUTH_FBSIGNIN_SUCCESS: {
      const { user, credential } = payload;

      return Object.assign({}, state, {
        fbToken: credential.accessToken,
        lifecycle: lifecycles.AUTH_LOGGEDIN,
        user: getUser(user),
      });
    }
    case actions.AUTH_FBSIGNIN_FAILURE:
      return Object.assign({}, state, {
        error: payload,
        lifecycle: lifecycles.AUTH_NOT_LOGGED_IN,
      });
    case actions.AUTH_STATECHANGE_LOGIN: {
      return Object.assign({}, state, {
        lifecycle: lifecycles.AUTH_LOGGEDIN,
        user: getUser(payload),
      });
    }
    case actions.GET_FB_ID_SUCCESS: {
      return Object.assign({}, state, {
        user: {
          ...state.user,
          fbId: get(response, 'data.id', null),
        },
      });
    }
    case actions.IN_FB_GROUP:
      return Object.assign({}, state, {
        user: {
          ...state.user,
          inGroup: true,
        },
      });
    case actions.NOT_IN_FB_GROUP:
      return Object.assign({}, state, {
        user: {
          ...state.user,
          inGroup: false,
        },
      });
    default:
      return state;
  }
};

export default auth;
