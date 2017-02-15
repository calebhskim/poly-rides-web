import actions from '../constants/actions';
import initialState from '../constants/initialState';
import lifecycles from '../constants/lifecycles';

const appState = (state = initialState.appState, { type }) => {
  switch(type) {
    case actions.IN_FB_GROUP:
      return lifecycles.DATA_LOADED;
    default:
      return state;
  }
};

export default appState;
