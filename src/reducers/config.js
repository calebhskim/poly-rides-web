import initialState from '../constants/initialState';
import actions from '../constants/actions';

const config = (state = initialState.config, { type }) => {
  switch(type) {
    case actions.APP_INITIALIZED_SUCCESS:
      return Object.assign({}, state, {});
    default:
      return state;
  }
};

export default config;
