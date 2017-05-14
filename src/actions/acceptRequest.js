import actions from '../constants/actions';

export default function acceptRequest(name, rideId, uid) {
  return (dispatch, getState) => {
    const {
      firebase: { app },
    } = getState();
    const rideRef = app.database().ref(`rides/${rideId}/passengers/${name}`);

    return rideRef.set(uid, (err) => {
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
  };
}
