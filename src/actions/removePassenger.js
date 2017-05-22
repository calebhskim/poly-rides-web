import actions from '../constants/actions';

export default function removePassenger(rideId, uid) {
  return (dispatch, getState) => {
    const {
      firebase: { app },
    } = getState();
    const rideRef = app.database().ref(`rides/${rideId}/passengers/${uid}`);

    return rideRef.set(null, (err) => {
      if (err) {
        // TODO: Handle errors properly
        console.log('REJECT REQUEST :: ', err);
        dispatch({
          type: actions.REMOVE_PASSENGER_FAILURE,
        });
      } else {
        dispatch({
          type: actions.REMOVE_PASSENGER_SUCCESS,
          payload: {
            rideId,
            uid,
          },
        });
      }
    });
  };
}
