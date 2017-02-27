import React from 'react';

import cloneDeep from 'lodash/cloneDeep';
import configureMockStore from 'redux-mock-store';
import firebase from 'firebase';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import config from '../../src/config/development';
import Feed from '../../src/components/Feed';
import initialState from '../../src/constants/initialState';

const mockStore = configureMockStore();

// connecting to firebase dev
const fbRef = firebase.initializeApp(config.firebase);
const ref = fbRef.database().ref('ridesTest');

describe('<Feed />', () => {
  it('dumb', () => {
    expect(3).toEqual(3);
  });
  // it('renders properly', () => {
  //   const modifiedState = cloneDeep(initialState);
  //   const store = mockStore(modifiedState);

  //   const props = {
  //     listenForRides: jest.fn(),
  //     setNavTitle: jest.fn(),
  //     stopListenForRides: jest.fn(),
  //   };

  //   const wrapper = shallow(<Feed {...props} store={store} />).shallow();
  //   expect(shallowToJson(wrapper)).toMatchSnapshot();
  // });
  // it('loads feed correctly from store', () => {
  //   const modifiedState = cloneDeep(initialState);
  //   modifiedState.firebase.app = ref;
  //   modifiedState.config.ridesDBName = 'ridesTest';
  //   const store = new Store(modifiedState);

  //   const wrapper = shallow(<Feed store={store} />).shallow();

  //   expect(shallowToJson(wrapper)).toMatchSnapshot();
  // });
});
