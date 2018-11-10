// @flow

import React from 'react';
import { shallow } from 'enzyme';

import { ContainerNavigationMask } from '../../primitives';

describe('LayoutManager primitives', () => {
  describe('ContainerNavigationMask', () => {
    it('should render correctly with default props', () => {
      const wrapper = shallow(<ContainerNavigationMask />);

      expect(wrapper).toMatchSnapshot();
    });

    it('should set pointerEvents to none when interaction is disabled', () => {
      const wrapper = shallow(<ContainerNavigationMask disableInteraction />);

      expect(wrapper).toMatchSnapshot();
    });
  });
});
