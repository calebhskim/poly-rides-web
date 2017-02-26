import React from 'react';

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import NotInGroup from '../../src/components/NotInGroup';

describe('<NotInGroup />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<NotInGroup />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
