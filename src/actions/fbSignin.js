import { push } from 'react-router-redux';

import actions from '../constants/actions';

export default function fbSignin() {
  return (dispatch, getState) => {
    const { firebase: { app, fbProvider } } = getState();
    const auth = app.auth();

    auth.signInWithRedirect(fbProvider).then(() => {
      auth.getRedirectResult().then((result) => {
        dispatch({
          type: actions.AUTH_FBSIGNIN_SUCCESS,
          payload: result,
        });
        dispatch(push('/dashboard'));
      }).catch((err) => {
        dispatch({
          type: actions.AUTH_FBSIGNIN_FAILURE,
          payload: err,
        });
      });
    });
  };
}
