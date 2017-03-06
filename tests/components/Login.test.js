import React from 'react';

import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { shallowToJson } from 'enzyme-to-json';

import { Login } from '../../src/components/Login';
import initialState from '../../src/constants/initialState';

const mockStore = configureMockStore();

describe('<Login />', () => {
  it('renders properly', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(
      <MuiThemeProvider>
        <Login store={store} />
      </MuiThemeProvider>).shallow();

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('when mounted dispatches correct actions', () => {
    let fbPopupSignin, setNavTitle, store, wrapper;

    beforeEach(() => {
      fbPopupSignin = jest.fn();
      setNavTitle = jest.fn();
      store = mockStore(initialState);
      wrapper = mount(
        <MuiThemeProvider>
          <Login store={store} fbPopupSignin={fbPopupSignin} setNavTitle={setNavTitle} />
        </MuiThemeProvider>,
      );
    });

    it('sets nav title in componentDidMount', () => {
      expect(setNavTitle).toHaveBeenCalledTimes(1);
    });

    it('dispatches correct action(s) when FB button is clicked', () => {
      wrapper.find('#loginButton').simulate('click');
      expect(fbPopupSignin).toHaveBeenCalledTimes(1);
    });
  });
});
