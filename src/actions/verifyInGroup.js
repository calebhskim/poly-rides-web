import { push } from 'react-router-redux';

import actions from '../constants/actions';

export default function verifyInGroup() {
  return (dispatch, getState) => {
    const { firebase: { app }, user: { fbId } } = getState();
  };
}
