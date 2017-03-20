import axios from 'axios';
import orderBy from 'lodash/orderBy';

import actions from '../constants/actions';

const {
  CURRENT_RIDES_CHANGE,
  FETCH_RIDES_START,
  FETCH_RIDES_SUCCESS,
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

function listenForRides() {
  return (dispatch, getState) => {
    const {
      firebase: { app },
      data: { rides: { displayCount } },
    } = getState();

    const ridesRef = app.database().ref('rides');
    // TODO: Update totalCount when this is fired
    ridesRef.orderByChild('postTimestamp').limitToLast(displayCount).on('value', (snap) => {
      const data = snap.val();
      const rides = Object.keys(data).map(k => ({
        ...data[k],
        k,
      }));
      const sorted = orderBy(rides, ['postTimestamp'], ['desc']);

      dispatch({
        type: CURRENT_RIDES_CHANGE,
        payload: sorted,
      });
    }, (err) => {
      // TODO: Implement proper error handling
      console.log('err: ', err);
    });
  };
}

function fetchRides({ startIndex, stopIndex }) {
  return (dispatch, getState) => {
    const {
      firebase: { app },
      data: {
        rides: {
          displayCount,
          list,
          startFrom: { key, timestamp },
          totalCount,
        },
      },
    } = getState();
    const count = list.length + displayCount > totalCount
      ? Math.abs(totalCount - displayCount) : displayCount;
    let ridesRef = app
      .database()
      .ref('rides')
      .orderByChild('postTimestamp')
      .limitToFirst(count);

    // Not the first load and we loaded all the rides
    if (key && list.length + displayCount > totalCount) {
      return Promise.resolve();
    }

    dispatch({
      type: FETCH_RIDES_START,
      payload: {
        startIndex,
        stopIndex,
      },
    });

    // We've already loaded rides
    if (key) {
      ridesRef = ridesRef.startAt(timestamp, key);
    }

    return ridesRef.once('value').then((snapshot) => {
      const data = snapshot.val();
      const rides = Object.keys(data).map(k => ({
        ...data[k],
        k,
      }));
      const sorted = orderBy(rides, ['postTimestamp'], ['desc']);
      const last = sorted[sorted.length - 1];

      dispatch({
        type: FETCH_RIDES_SUCCESS,
        payload: {
          last: {
            key: last.k,
            timestamp: last.postTimestamp,
          },
          rides: sorted.slice(0, -1),
          startIndex,
          stopIndex,
        },
      });
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

export { countRides, listenForRides, fetchRides, stopListenForRides };
