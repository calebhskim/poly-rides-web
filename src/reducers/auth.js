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

const auth = (state = initialState.auth, { payload, type }) => {
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

    default:
      return state;
  }
};

export default auth;
