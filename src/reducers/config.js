import initialState from '../constants/initialState';
import actions from '../constants/actions';

const config = (state = initialState.config, { payload, type }) => {
  switch(type) {
    case actions.APP_INITIALIZED_SUCCESS:
      return Object.assign({}, state, {});
    case actions.NAV_BAR_TITLE_CHANGE:
      return Object.assign({}, state, {
        title: payload.newTitle,
      });
    default:
      return state;
  }
};

export default config;
