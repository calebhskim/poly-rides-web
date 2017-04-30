import actions from '../constants/actions';
import initialState from '../constants/initialState';

const rides = (state = initialState.data.userRides, { payload, response, type }) => {
  switch(type) {
    case actions.FETCH_USERRIDES_START:
      return Object.assign({}, state, {
        isLoading: true,
      });
    default:
      return state;
  }
};

export default rides;
