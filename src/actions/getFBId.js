import axios from 'axios';

import actions from '../constants/actions';

const {
  GET_FB_ID_START,
  GET_FB_ID_SUCCESS,
  GET_FB_ID_FAILURE,
} = actions;

export default function getFBId() {
  return {
    types: {
      request: GET_FB_ID_START,
      success: GET_FB_ID_SUCCESS,
      failure: GET_FB_ID_FAILURE,
    },
    shouldCallAPI: state => !state.auth.user.fbId,
    callAPI: (state) => {
      const { auth: { fbToken }, config: { urls: { graph } } } = state;
      return axios({
        method: 'get',
        baseURL: graph,
        url: '/me',
        params: {
          access_token: fbToken,
        },
      });
    },
  };
}
