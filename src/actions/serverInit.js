import actions from '../constants/actions';

const serverInit = clientConfig => dispatch => dispatch({
  type: actions.APP_INITIALIZED_SUCCESS,
  payload: {
    config: clientConfig,
  },
});

export default serverInit;
