import React from 'react';

import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Dashboard from '../../src/components/Dashboard';
import initialState from '../../src/constants/initialState';

const mockStore = configureMockStore();

describe('<Dashboard />', () => {
  it('renders properly', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(<Dashboard store={store} />).shallow();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
