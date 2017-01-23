import { push } from 'react-router-redux';

import actions from '../constants/actions';

export default function getFBRedirectResult() {
  return (dispatch, getState) => {
    const { firebase: { app } } = getState();
    const auth = app.auth();

    auth.getRedirectResult().then((result) => {
      if (result.credential) {
        dispatch({
          type: actions.AUTH_FBSIGNIN_SUCCESS,
          payload: result,
        });
        dispatch(push('/dashboard'));
      } else {
        // Dispatch normal load action here
      }
    }).catch((err) => {
      dispatch({
        type: actions.AUTH_FBSIGNIN_FAILURE,
        payload: err,
      });
    });
  };
}
