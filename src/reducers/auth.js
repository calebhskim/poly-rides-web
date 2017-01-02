import actions from '../constants/actions';
import initialState from '../constants/initialState';
import lifecycles from '../constants/lifecycles';

const auth = (state = initialState.auth, { payload, type }) => {
  switch(type) {
    case actions.AUTH_LOGIN_START:
      return Object.assign({}, state, {
        lifecycle: lifecycles.AUTH_START,
      });
    case actions.AUTH_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        lifecycle: lifecycles.AUTH_LOGGEDIN,
        user: {
          name: payload.username,
        },
      });
    default:
      return state;
  }
};

export default auth;
