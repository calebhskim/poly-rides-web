import { push } from 'react-router-redux';

import actions from '../constants/actions';

export default function verifyInGroup() {
  return (dispatch, getState) => {
    const { firebase: { app }, auth: { user: { fbId } } } = getState();
    app.database().ref('members').child(fbId).once('value', (snapshot) => {
      if(snapshot.val() !== null) {
        dispatch({
          type: actions.IN_FB_GROUP,
        });
      } else {
        dispatch({
          type: actions.NOT_IN_FB_GROUP,
        });
        dispatch(push('/dashboard/n'));
      }
    });
  };
}
