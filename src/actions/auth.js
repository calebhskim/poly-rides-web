import firebase from 'firebase';

import actions from '../constants/actions';

export default () => {
  return (dispatch, getState) => {
    const { firebase: { app } } = getState();
    const auth = app.auth();

    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch({
          type: actions.AUTH_CHANGE_LOGIN,
          payload: {
            name: user.displayName
          },
        });
      } else {
        dispatch({
          type: actions.AUTH_CHANGE_LOGOUT
        });
      }
    });    
  };
};
