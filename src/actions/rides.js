import axios from 'axios';

import actions from '../constants/actions';

const {
  CURRENT_RIDES_CHANGE,
  GET_RIDES_COUNT,
  GET_RIDES_COUNT_SUCCESS,
  GET_RIDES_COUNT_FAILURE,
} = actions;

function countRides() {
  return {
    types: {
      request: GET_RIDES_COUNT,
      success: GET_RIDES_COUNT_SUCCESS,
      failure: GET_RIDES_COUNT_FAILURE,
    },
    callAPI: (state) => {
      const { config: { urls: { firebaseDB } } } = state;
      return axios({
        method: 'get',
        baseURL: firebaseDB,
        url: '/rides.json',
        params: {
          shallow: true,
        },
      });
    },
  };
}

function fetchUserRides() {
  // TODO: Fetch user rides based on keys in user table. Possibly use cloud functions.
  return (dispatch, getState) => {
    const {
      auth: { user: { uid } },
      firebase: { app },
    } = getState();
    const ridesRef = app.database().ref('rides');

    dispatch({
      type: actions.FETCH_USERRIDES_START,
    });

    ridesRef.orderByChild(`passengers/${uid}`).equalTo(true).on('value', (snap) => {
      dispatch({
        type: actions.USER_PASSENGER_RIDES,
        payload: snap.val(),
      });
    });
    ridesRef.orderByChild(`requests/${uid}`).equalTo(true).on('value', (snap) => {
      dispatch({
        type: actions.USER_PASSENGER_REQUESTS,
        payload: snap.val(),
      });
    });
    ridesRef.orderByChild('driver/uid').equalTo(uid).on('value', (snap) => {
      dispatch({
        type: actions.USER_PASSENGER_DRIVES,
        payload: snap.val(),
      });
    });
  };
}

function listenForRides() {
  return (dispatch, getState) => {
    const {
      firebase: { app },
      // data: { rides: { displayCount } },
    } = getState();

    const ridesRef = app.database().ref('rides');
    // TODO: Update totalCount when this is fired
    ridesRef.orderByChild('postTimestamp').on('child_added', (snap) => {
      const ride = snap.val();

      // Note: Skip initial value, only listen for updates
      // Can fire two actions here: one for initial and one for new
      // saves on sorting in reducer
      dispatch({
        type: CURRENT_RIDES_CHANGE,
        payload: ride,
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

export { countRides, fetchUserRides, listenForRides, stopListenForRides };
