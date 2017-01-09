import firebase from 'firebase';

import actions from '../constants/actions';

const auth = firebase.auth();

export default () => {
  return dispatch => {
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
