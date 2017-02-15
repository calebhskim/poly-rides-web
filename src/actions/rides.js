import actions from '../constants/actions';


function listenForRides() {
  return (dispatch, getState) => {
    const { firebase: { app } } = getState();

    const ridesRef = app.database().ref('rides');

    ridesRef.orderByChild('costPerSeat').on('value', (snap) => {
      console.log(snap.val());

      dispatch({
        type: actions.CURRENT_RIDES_CHANGE,
        payload: snap.val(),
      });
    }, (err) => {
      console.log('err');
      console.log(err);
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
