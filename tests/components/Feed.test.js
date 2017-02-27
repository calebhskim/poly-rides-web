import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { Feed } from '../../src/components/Feed';

describe('<Feed />', () => {
  it('renders properly', () => {
    const props = {
      listenForRides: jest.fn(),
      setNavTitle: jest.fn(),
      stopListenForRides: jest.fn(),
    };

    const wrapper = shallow(
      <MuiThemeProvider>
        <Feed {...props} />
      </MuiThemeProvider>).shallow();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('shows feeditems', () => {
    const props = {
      feed: {
        id1: {
          postTimestamp: 10,
          dest: 'slo',
        },
        id2: {
          postTimestamp: 12,
          dest: 'la',
        },
        id3: {
          postTimestamp: 8,
          dest: 'sf',
        },
      },
      listenForRides: jest.fn(),
      setNavTitle: jest.fn(),
      stopListenForRides: jest.fn(),
    };

    const wrapper = shallow(
      <MuiThemeProvider>
        <Feed {...props} />
      </MuiThemeProvider>).shallow();
    // snapshot shows proper order
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
