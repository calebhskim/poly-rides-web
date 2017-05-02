import { push } from 'react-router-redux';

import actions from '../constants/actions';
// import signout from './signout';

export default function verifyInGroup() {
  return (dispatch, getState) => {
    const { firebase: { app }, auth: { user: { fbId } } } = getState();
    app.database().ref('members').child(fbId).once('value', (snapshot) => {
      dispatch({
        type: actions.IN_FB_GROUP,
      });
      dispatch(push('/dashboard'));

      // Disabling this while it is fixed to allow for site testing.
      // if(snapshot.val() !== null) {
      //   dispatch({
      //     type: actions.IN_FB_GROUP,
      //   });
      //   dispatch(push('/dashboard'));
      // } else {
      //   dispatch({
      //     type: actions.NOT_IN_FB_GROUP,
      //   });
      //   dispatch(signout());
      //   dispatch(push('/'));
      // }
    });
  };
}
