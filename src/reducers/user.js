import actions from '../constants/actions';
import initialState from '../constants/initialState';

const user = (state = initialState.auth.user, { type }) => {
  switch(type) {
    case actions.IN_FB_GROUP:
      return Object.assign({}, state, {
        inGroup: true,
      });
    case actions.NOT_IN_FB_GROUP:
      return Object.assign({}, state, {
        inGroup: false,
      });
    default:
      return state;
  }
};

export default user;
