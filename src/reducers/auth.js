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
        lifecycle: lifecycles.AUTH_LOGGEDIN,
        user: getUser(payload),
      });
    default:
      return state;
  }
};

export default auth;
