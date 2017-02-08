import { push } from 'react-router-redux';

import actions from '../constants/actions';
import graphRequest from '../actions/graphRequest';

export default function checkGroup() {
  return (dispatch, getState) => {
    return graphRequest().then(() => {

    });
  };
}
