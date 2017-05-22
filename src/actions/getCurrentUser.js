import actions from '../constants/actions';

export default function getCurrentUser() {
  return (dispatch, getState) => {
    const { firebase: { app } } = getState();
    const auth = app.auth();

    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: actions.AUTH_STATECHANGE_LOGIN,
          payload: user,
        });
      } else {
        dispatch({
          type: actions.AUTH_STATECHANGE_LOGOUT,
        });
      }
    }, (err) => {
      // TODO: Properly log errors
      console.log('AUTH ERR :: ', err);
    });
  };
}
