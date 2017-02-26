import React from 'react';

import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Contact from '../../src/components/Contact';
import initialState from '../../src/constants/initialState';

const mockStore = configureMockStore();

describe('<Contact />', () => {
  it('renders properly', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(<Contact store={store} />).shallow();

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
