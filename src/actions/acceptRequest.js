import actions from '../constants/actions';
import rejectRequest from './rejectRequest';

export default function acceptRequest(name, rideId, uid) {
  return (dispatch, getState) => {
    const {
      firebase: { app },
    } = getState();
    const rideRef = app.database().ref(`rides/${rideId}/passengers/${uid}`);

    // Remove user from request once accpeted
    return rejectRequest(rideId, uid).then(() => {
      rideRef.set(name, (err) => {
        if (err) {
          // TODO: Handle errors properly
          console.log('ACCEPT REQUEST :: ', err);
          dispatch({
            type: actions.ACCEPT_REQUEST_FAILURE,
          });
        } else {
          dispatch({
            type: actions.ACCEPT_REQUEST_SUCCESS,
            payload: {
              name,
              rideId,
              uid,
            },
          });
        }
      });
    });
  };
}
