import React from 'react';

import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Login from '../../src/components/Login';
import initialState from '../../src/constants/initialState';

const mockStore = configureMockStore();

describe('<Login />', () => {
  it('renders properly', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(<Login store={store} />).shallow();

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
