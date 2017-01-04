import { push } from 'react-router-redux';

import actions from '../constants/actions';

export default function signout() {
  return (dispatch, getState) => {
    const { firebase: { app } } = getState();
    const auth = app.auth();

    auth.signOut().then(() => {
      dispatch({
        type: actions.AUTH_SIGNOUT_SUCCESS,
      });
      dispatch(push('/'));
    }).catch((err) => {
      dispatch({
        type: actions.AUTH_SIGNOUT_FAILURE,
        payload: err,
      });
    });
  };
}
