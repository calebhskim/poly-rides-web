import actions from '../constants/actions';

export default function rejectRequest(rideId, uid) {
  return (dispatch, getState) => {
    const {
      firebase: { app },
    } = getState();
    const rideRef = app.database().ref(`rides/${rideId}/requests/${uid}`);
    const userRideRef = app.database().ref(`users/${uid}/requests/${rideId}`);

    return rideRef.set(null, (err) => {
      if (err) {
        // TODO: Handle errors properly
        console.log('REJECT REQUEST :: ', err);
        dispatch({
          type: actions.REJECT_REQUEST_FAILURE,
        });
      } else {
        dispatch({
          type: actions.REJECT_REQUEST_SUCCESS,
          payload: {
            rideId,
            uid,
          },
        });
      }
    }).then(() => {
      userRideRef.set(null, (err) => {
        if (err) {
          // TODO: Handle errors properly
          console.log('DELETE USER REQUEST :: ', err);
          dispatch({
            type: actions.DELETE_USER_REQUEST_FAILURE,
          });
        }
      });
    });
    // NOTE: Later these either both have to fail or both succeed
  };
}
