import React from 'react';

import cloneDeep from 'lodash/cloneDeep';
import firebase from 'firebase';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import config from '../../src/config/development';
import Feed from '../../src/components/Feed';
import initialState from '../../src/constants/initialState';
import serverInit from '../../src/actions/serverInit';
import Store from '../../src/store';

// connecting to firebase dev
const fbRef = firebase.initializeApp(config.firebase);
const ref = fbRef.database().ref('ridesTest');

describe('<Feed />', () => {
  it('renders properly', () => {
    const modifiedState = cloneDeep(initialState);
    modifiedState.config.ridesDBName = 'ridesTest';
    const store = new Store(modifiedState);

    store.dispatch(serverInit(fbRef));

    const wrapper = shallow(<Feed store={store} />).shallow();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  // it('loads feed correctly from store', () => {
  //   const modifiedState = cloneDeep(initialState);
  //   modifiedState.firebase.app = ref;
  //   modifiedState.config.ridesDBName = 'ridesTest';
  //   const store = new Store(modifiedState);

  //   const wrapper = shallow(<Feed store={store} />).shallow();

  //   expect(shallowToJson(wrapper)).toMatchSnapshot();
  // });
});
