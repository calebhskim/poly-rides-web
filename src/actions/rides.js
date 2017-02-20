import actions from '../constants/actions';


function listenForRides() {
  return (dispatch, getState) => {
    const { firebase: { app } } = getState();

    const ridesRef = app.database().ref('rides');
    const displayCount = 10;

    ridesRef.orderByChild('postTimestamp').limitToLast(displayCount).on('value', (snap) => {
      dispatch({
        type: actions.CURRENT_RIDES_CHANGE,
        payload: snap.val(),
      });
    }, (err) => {
      // TODO: Implement proper error handling
      console.log('err: ', err);
    });
  };
}

function stopListenForRides() {
  return (dispatch, getState) => {
    const { firebase: { app } } = getState();

    const ridesRef = app.database().ref('rides');

    ridesRef.off();
  };
}

export { listenForRides, stopListenForRides };
