import actions from '../constants/actions';
import initialState from '../constants/initialState';

const posts = (state = initialState.data.posts, { payload, type }) => {
  switch(type) {
    case actions.CURRENT_RIDES_CHANGE:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
};

export default posts;
