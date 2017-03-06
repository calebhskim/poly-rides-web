import React from 'react';

import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import About from '../../src/components/About';
import initialState from '../../src/constants/initialState';

const mockStore = configureMockStore();

describe('<About />', () => {
  it('renders properly', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(<About store={store} />).shallow();

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
