import { push } from 'react-router-redux';

import actions from '../constants/actions';

export default function signup(email, password) {
  return (dispatch, getState) => {
    const { firebase: { app } } = getState();
    const auth = app.auth();

    auth.createUserWithEmailAndPassword(email, password).then((user) => {
      const { uid } = user;

      dispatch({
        type: actions.AUTH_LOGIN_SUCCESS,
        payload: user,
      });
      dispatch(push(`/dashboard/${uid}`));
    }).catch((err) => {
      dispatch({
        type: actions.AUTH_SIGNUP_FAILURE,
        payload: err,
      });
    });
  };
}
