import { push } from 'react-router-redux';

import actions from '../constants/actions';
// import signout from './signout';

export default function verifyInGroup() {
  return (dispatch, getState) => {
    const { firebase: { app }, auth: { user: { fbId } } } = getState();
    app.database().ref('members').child(fbId).once('value', (snapshot) => {
      // disabled group verify to allow for testing
      dispatch({
        type: actions.IN_FB_GROUP,
      });
      dispatch(push('/dashboard'));


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
