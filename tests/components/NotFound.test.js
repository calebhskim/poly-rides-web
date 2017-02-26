import React from 'react';

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import NotFound from '../../src/components/NotFound';

describe('<NotFound />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<NotFound />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
