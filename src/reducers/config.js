import actions from '../constants/actions';
import appConfig from '../config';
import initialState from '../constants/initialState';

const config = (state = initialState.config, { payload, type }) => {
  switch(type) {
    case actions.APP_INITIALIZED_SUCCESS:
      return Object.assign({}, state, appConfig);
    case actions.NAV_BAR_TITLE_CHANGE:
      return Object.assign({}, state, {
        title: payload.newTitle,
      });
    default:
      return state;
  }
};

export default config;
