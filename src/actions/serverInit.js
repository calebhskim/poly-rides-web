import actions from '../constants/actions';

const serverInit = fbApp => dispatch => dispatch({
  type: actions.APP_INITIALIZED_SUCCESS,
  payload: {
    fbApp,
  },
});

export default serverInit;
