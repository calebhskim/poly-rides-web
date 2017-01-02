import actions from '../constants/actions';

export default function signup(email, password) {
  return (dispatch, getState) => {
    const { firebase: { app } } = getState();
    const auth = app.auth();

    auth.createUserWithEmailAndPassword(email, password).then(() => {
      dispatch({
        type: actions.AUTH_SIGNUP_SUCCESS,
      });
    }).catch(err => console.log('SIGNUP ERR :: ', err));
  };
}
