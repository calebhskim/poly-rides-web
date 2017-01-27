import { push } from 'react-router-redux';

import actions from '../constants/actions';

export default function fbPopupSignin() {
  return (dispatch, getState) => {
    const { firebase: { app, fbProvider } } = getState();
    const auth = app.auth();

    return auth.signInWithPopup(fbProvider).then((result) => {
      dispatch({
        type: actions.AUTH_FBSIGNIN_SUCCESS,
        payload: result,
      });
      dispatch(push('/dashboard'));

      return Promise.resolve();
    }).catch((err) => {
      dispatch({
        type: actions.AUTH_FBSIGNIN_FAILURE,
        payload: err,
      });

      dispatch(push('/'));
      return Promise.reject();
    });
  };
}
