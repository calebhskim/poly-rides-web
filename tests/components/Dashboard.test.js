import React from 'react';
import { Text } from 'react-native';

import cloneDeep from 'lodash/cloneDeep';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Dashboard from '../../src/components/Dashboard';
import initialState from '../../src/constants/initialState';
import lifecycles from '../../src/constants/lifecycles';
import Loading from '../../src/components/Loading';

const mockStore = configureMockStore();

describe('<Dashboard />', () => {
  it('renders properly', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(<Dashboard store={store} />).shallow();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('shows <Loading /> when status is loading', () => {
    const modifiedState = cloneDeep(initialState);
    modifiedState.appState.status = lifecycles.LOADING;

    const store = mockStore(modifiedState);
    const wrapper = shallow(<Dashboard store={store} />).shallow();

    expect(wrapper.find(Loading)).toHaveLength(1);
    expect(wrapper.find(Text)).toHaveLength(0);
  });
  it('does not show <Loading /> when status is not loading and shows right displayName', () => {
    const modifiedState = cloneDeep(initialState);
    modifiedState.appState.status = lifecycles.DATA_LOADED;
    modifiedState.auth.user.displayName = 'bobby';

    const store = mockStore(modifiedState);
    const wrapper = shallow(<Dashboard store={store} />).shallow();

    expect(wrapper.find(Loading)).toHaveLength(0);
    expect(wrapper.find(Text)).toHaveLength(1);
    // this is pretty gross.
    // text breaks up its contents into two groups so the later one is selcted to compare
    //  to the displayname
    expect(wrapper.find(Text).children().last().text()).toEqual('bobby');
  });
});
