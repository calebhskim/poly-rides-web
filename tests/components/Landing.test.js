import React from 'react';

import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Landing from '../../src/components/Landing';
import initialState from '../../src/constants/initialState';

const mockStore = configureMockStore();

describe('<Landing />', () => {
  it('renders properly', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(<Landing store={store} />).shallow();

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
