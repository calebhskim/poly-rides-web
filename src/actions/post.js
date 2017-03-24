import actions from '../constants/actions';

export default function post(ride) {
  return (dispatch, getState) => {
    const { firebase: { app } } = getState();
    const rides = app.database().ref('rides');

    console.log('RIDE :: ', ride);
    rides.push(ride, (err) => {
      // TODO: Properly handle errors
      if (err) {
        console.log('POST ERR :: ', err);
        return;
      }

      dispatch({
        type: actions.POST_RIDE_SUCCESS,
      });
    });
  };
}
