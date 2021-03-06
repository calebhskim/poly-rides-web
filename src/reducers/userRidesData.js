import actions from '../constants/actions';
import initialState from '../constants/initialState';

const userRidesData = (state = initialState.data.userRidesData, { payload, type }) => {
  switch(type) {
    case actions.FETCH_USERRIDES_START:
      return Object.assign({}, state, {
        isDrivingLoading: true,
        isRidesLoading: true,
        isRequestsLoading: true,
      });
    case actions.USERRIDES_RIDES: {
      let userRides;
      if (payload === null) {
        userRides = [];
      } else {
        userRides = Object.keys(payload).map(k => ({
          ...payload[k],
          type: 'ride',
        }));
      }

      return Object.assign({}, state, {
        isRidesLoading: false,
        rides: userRides,
      });
    }
    case actions.USERRIDES_REQUESTS: {
      let requests;
      if (payload === null) {
        requests = [];
      } else {
        requests = Object.keys(payload).map(k => ({
          ...payload[k],
          type: 'request',
        }));
      }

      return Object.assign({}, state, {
        isRequestsLoading: false,
        requests,
      });
    }
    case actions.USERRIDES_DRIVES: {
      let drives;
      if (payload === null) {
        drives = [];
      } else {
        drives = Object.keys(payload).map(k => ({
          ...payload[k],
          type: 'drive',
        }));
      }

      return Object.assign({}, state, {
        isDrivesLoading: false,
        drives,
      });
    }
    // case actions.ACCEPT_REQUEST_SUCCESS: {
    //   const { drives } = state;
    //   const { name, rideId, uid } = payload;
    //   const newDrives = drives.map((drive) => {
    //     const newDrive = JSON.parse(JSON.stringify(drive));
    //     if (!newDrive.passengers) {
    //       newDrive.passengers = {};
    //     }

    //     if (newDrive.id === rideId) {
    //       newDrive.passengers[name] = uid;
    //       delete newDrive.requests[uid];
    //     }

    //     return newDrive;
    //   });
    //   return Object.assign({}, state, {
    //     drives: newDrives,
    //   });
    // }
    // case actions.REJECT_REQUEST_SUCCESS: {
    //   const { requests } = state;
    //   const { rideId, uid } = payload;
    //   const newRequests = requests.map((req) => {
    //     const newReq = JSON.parse(JSON.stringify(req));

    //     if (newReq.id === rideId) {
    //       delete newReq.requests[uid];
    //     }

    //     return newReq;
    //   });

    //   return Object.assign({}, state, {
    //     requests: newRequests,
    //   });
    // }
    default:
      return state;
  }
};

export default userRidesData;
