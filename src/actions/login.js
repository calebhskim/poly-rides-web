import actions from '../constants/actions';

export default function login(email, password) {
  return (dispatch, getState) => {
    const { firebase: { app } } = getState();
    const auth = app.auth();

    auth.signInWithEmailAndPassword(email, password).then((user) => {
      dispatch({
        type: actions.AUTH_LOGIN_SUCCESS,
        payload: user,
      });
    }).catch(err => console.log('LOGIN ERR :: ', err));
  };
}
