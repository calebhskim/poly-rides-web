import React from 'react';

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Loading from '../../src/components/Loading';

describe('<Loading />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<Loading />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
