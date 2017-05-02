import haversine from 'haversine';

import actions from '../constants/actions';


const {
  RIDES_SEARCH_RESULTS,
  RIDES_SEARCH_START,
  RIDES_SEARCH_STOP,
} = actions;


function sortRides(depart, arrive, possibleRides) {
  const orderedRides = Object.values(possibleRides);

  orderedRides.sort((a, b) => {
    const dist1 = haversine(depart, a.departLocation) +
      haversine(arrive, a.arriveLocation);

    const dist2 = haversine(depart, b.departLocation) +
      haversine(arrive, b.arriveLocation);

    return dist1 - dist2;
  });

  return orderedRides;
}

function clearSearch() {
  return (dispatch) => {
    dispatch({
      type: RIDES_SEARCH_STOP,
    });
  };
}

function searchFeed(depart, arrive, date) {
  return (dispatch, getState) => {
    const {
      firebase: { app },
      data: { rides: { isSearching } },
    } = getState();

    const rides = app.database().ref('rides');

    if (isSearching) {
      console.log('Error: Cannot search while in the middle of a search');
    } else {
      dispatch({
        type: RIDES_SEARCH_START,
      });

      const searchDate = date.getTime();

      rides.orderByChild('departTimestamp').startAt(searchDate).once('value', (snap) => {
        const possibleRides = snap.val();
        const orderedRides = possibleRides ? sortRides(depart, arrive, possibleRides) : {};

        dispatch({
          type: RIDES_SEARCH_RESULTS,
          payload: {
            searchResults: orderedRides,
          },
        });
      });
    }
  };
}

export { clearSearch, searchFeed };
