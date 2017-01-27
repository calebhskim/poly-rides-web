import * as firebase from 'firebase';

import actions from '../constants/actions';

const serverInit = fbApp => dispatch => dispatch({
  type: actions.APP_INITIALIZED_SUCCESS,
  payload: {
    fbApp,
    fbProvider: new firebase.auth.FacebookAuthProvider(),
  },
});

export default serverInit;
