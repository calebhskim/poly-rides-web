import actions from '../constants/actions';

export default function request(req) {
  return (dispatch, getState) => {
    const {
      auth: { user: { uid } },
      firebase: { app },
    } = getState();
    const {
      newRequests,
      rideId,
    } = req;
    const rides = app.database().ref('rides');
    const update = {};

    update[`/${rideId}/requests`] = newRequests;

    dispatch({
      type: actions.REQUEST_RIDE_START,
      payload: uid,
    });

    return rides.update(update, (err) => {
      // TODO: Properly handle errors
      if (err) {
        console.log('POST ERR :: ', err);
        return Promise.reject();
      }

      dispatch({
        type: actions.REQUEST_RIDE_SUCCESS,
      });

      return Promise.resolve();
    });
  };
}
