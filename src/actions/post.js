import actions from '../constants/actions';

export default function post(ride) {
  return (dispatch, getState) => {
    const {
      auth: { user: { uid } },
      firebase: { app },
    } = getState();
    const rides = app.database().ref('rides');

    dispatch({
      type: actions.POST_RIDE_START,
      payload: uid,
    });

    return rides.push(ride, (err) => {
      // TODO: Properly handle errors
      if (err) {
        console.log('POST ERR :: ', err);
        return Promise.reject();
      }

      dispatch({
        type: actions.POST_RIDE_SUCCESS,
      });

      return Promise.resolve();
    });
  };
}