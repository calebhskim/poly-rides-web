import actions from '../constants/actions';

const setNavTitle = newTitle => dispatch => dispatch({
  type: actions.NAV_BAR_TITLE_CHANGE,
  payload: {
    newTitle,
  },
});

export default setNavTitle;
