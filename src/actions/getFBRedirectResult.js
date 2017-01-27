import { push } from 'react-router-redux';

import actions from '../constants/actions';

export default function getFBRedirectResult() {
  return (dispatch, getState) => {
    const { firebase: { app } } = getState();
    const auth = app.auth();

    return auth.getRedirectResult().then((result) => {
      if (result.credential) {
        dispatch({
          type: actions.AUTH_FBSIGNIN_SUCCESS,
          payload: result,
        });

        dispatch(push('/dashboard'));
        return Promise.resolve();
      }

      dispatch(push('/'));
      return Promise.reject();
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
