import actions from '../constants/actions';

export default function rejectRequest(rideId, uid) {
  return (dispatch, getState) => {
    const {
      firebase: { app },
    } = getState();
    const rideRef = app.database().ref(`rides/${rideId}/requests/${uid}`);

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
    });
  };
}
