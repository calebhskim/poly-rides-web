import initialState from '../constants/initialState';
import actions from '../constants/actions';

const firebase = (state = initialState.firebase, { payload, type }) => {
  switch(type) {
    case actions.APP_INITIALIZED_SUCCESS: {
      const { fbApp, fbProvider } = payload;
      return Object.assign({}, state, {
        app: fbApp,
        fbProvider,
      });
    }
    default:
      return state;
  }
};

export default firebase;
