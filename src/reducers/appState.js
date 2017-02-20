import actions from '../constants/actions';
import initialState from '../constants/initialState';
import lifecycles from '../constants/lifecycles';

const appState = (state = initialState.appState, { payload, type }) => {
  switch(type) {
    case actions.IN_FB_GROUP:
      return Object.assign({}, state, {
        status: lifecycles.DATA_LOADED,
      });
    case actions.NOT_IN_FB_GROUP:
      return Object.assign({}, state, {
        status: lifecycles.DATA_LOADED,
      });
    case actions.CURRENT_RIDES_CHANGE: {
      return Object.assign({}, state, {
        feed: payload,
      });
    }
    default:
      return state;
  }
};

export default appState;
