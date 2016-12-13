import initialState from '../constants/initialState';

export default configReducer(state = initialState.config, { type, payload }) {
  switch(type) {
    default:
      return state;
  }
}
