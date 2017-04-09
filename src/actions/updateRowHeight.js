import actions from '../constants/actions';

export default index => (dispatch) => {
  dispatch({
    type: actions.CHANGE_ROW_HEIGHT,
    payload: index,
  });

  return Promise.resolve();
};
