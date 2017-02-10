import { push } from 'react-router-redux';

import actions from '../constants/actions';
import getFBId from '../actions/getFBId';

export default function fbPopupSignin() {
  return (dispatch, getState) => {
    const { firebase: { app, fbProvider } } = getState();
    const auth = app.auth();

    return auth.signInWithPopup(fbProvider).then((result) => {
      Promise.resolve(dispatch({
        type: actions.AUTH_FBSIGNIN_SUCCESS,
        payload: result,
      })).then(() => {
        dispatch(push('/dashboard'));
        return dispatch(getFBId());
      });
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
