import { push } from 'react-router-redux';

import actions from '../constants/actions';
import checkUser from '../actions/checkUser';
import getFBId from '../actions/getFBId';
import verifyInGroup from '../actions/verifyInGroup';

export default function fbPopupSignin() {
  return (dispatch, getState) => {
    const { firebase: { app, fbProvider } } = getState();
    const auth = app.auth();

    return auth.signInWithPopup(fbProvider).then((result) => {
      dispatch({
        type: actions.AUTH_FBSIGNIN_SUCCESS,
        payload: result,
      });
      dispatch(getFBId()).then(() => {
        dispatch(verifyInGroup());
        dispatch(checkUser());
      });
    }).catch((err) => {
      // TODO: Handle this properly, currently hangs
      dispatch({
        type: actions.AUTH_FBSIGNIN_FAILURE,
        payload: err,
      });
      dispatch(push('/'));
      return Promise.reject();
    });
  };
}
