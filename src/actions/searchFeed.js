import haversine from 'haversine';

import actions from '../constants/actions';


const {
  SEARCH_FEED,
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
      const searchDate = date.getTime();

      rides.orderByChild('departTimestamp').startAt(searchDate).once('value', (snap) => {
        const possibleRides = snap.val();

        console.log(possibleRides);

        if (possibleRides != null) {
          const orderedRides = sortRides(depart, arrive, possibleRides);

          console.log(orderedRides);
        }

        // dispatch({
        //   type: SEARCH_FEED,
        //   payload: {
        //     orderedRides,
        //   },
        // });
      });
    }
  };
}

export default searchFeed;
