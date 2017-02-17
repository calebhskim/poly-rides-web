import actions from '../constants/actions';


function listenForRides() {
  return (dispatch, getState) => {
    const { firebase: { app } } = getState();

    const ridesRef = app.database().ref('rides');

    ridesRef.orderByChild('costPerSeat').on('value', (snap) => {
      dispatch({
        type: actions.CURRENT_RIDES_CHANGE,
        payload: snap.val(),
      });
    }, (err) => {
      // TODO: a later task will fix this
      console.log('err: ', err);
    });
  };
}

// is this nonsense? it dispatches no actions
function stopListenForRides() {
  return (dispatch, getState) => {
    const { firebase: { app } } = getState();

    const ridesRef = app.database().ref('rides');

    ridesRef.off();
  };
}

export { listenForRides, stopListenForRides };
