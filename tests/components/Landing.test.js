import React from 'react';

import cloneDeep from 'lodash/cloneDeep';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import initialState from '../../src/constants/initialState';
import Landing from '../../src/components/Landing';
import Loading from '../../src/components/Loading';

const mockStore = configureMockStore();

describe('<Landing />', () => {
  it('renders properly', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(<Landing store={store} />).shallow();

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('shows <Loading /> when fetching', () => {
    const modifiedState = cloneDeep(initialState);
    modifiedState.auth.isFetching = true;

    const store = mockStore(modifiedState);
    const wrapper = shallow(<Landing store={store} />).shallow();

    expect(wrapper.find(Loading)).toHaveLength(1);
  });
  it('does not show <Loading /> when no fetching', () => {
    const modifiedState = cloneDeep(initialState);
    modifiedState.auth.isFetching = false;
    modifiedState.auth.user.displayName = 'bobby';

    const store = mockStore(modifiedState);
    const wrapper = shallow(<Landing store={store} />).shallow();

    expect(wrapper.find(Loading)).toHaveLength(0);
  });
});
