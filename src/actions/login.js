import { push } from 'react-router-redux';

import actions from '../constants/actions';

export default function login(email, password) {
  return (dispatch, getState) => {
    const { firebase: { app } } = getState();
    const auth = app.auth();

    auth.signInWithEmailAndPassword(email, password).then((user) => {
      const { uid } = user;

      dispatch({
        type: actions.AUTH_LOGIN_SUCCESS,
        payload: user,
      });
      dispatch(push(`/dashboard/${uid}`));
    }).catch((err) => {
      dispatch({
        type: actions.AUTH_LOGIN_FAILURE,
        payload: err,
      });
    });
  };
}
