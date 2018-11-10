// @flow
import React from 'react';
import { shallow } from 'enzyme';

import ContentNavigation from '../../index';
import { transitionDurationMs } from '../../../../../../common/constants';

const defaultProps = {
  isPeekHinting: false,
  isPeeking: false,
  isVisible: false,
  product: () => null,
};

describe('ContentNavigation', () => {
  it('should not trigger animations on first-page load', () => {
    const wrapper = shallow(
      <ContentNavigation {...defaultProps}>
        <div>Hello world</div>
      </ContentNavigation>,
    );

    expect(wrapper.find('Transition').props().timeout).toBe(0);

    wrapper.setProps({ isPeeking: false });

    expect(wrapper.find('Transition').props().timeout).toBe(
      transitionDurationMs,
    );
  });
});
