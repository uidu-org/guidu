// @flow
import { mount } from 'enzyme';
import React from 'react';

import { AtlassianLogo } from '../..';

describe('Logo component', () => {
  it('should render an svg', () => {
    const wrapper = mount(<AtlassianLogo />);
    // Need to search the html string because we use dangerouslySetInnerHTML, which
    // does not work with .find
    expect(wrapper.html().includes('<svg')).toBe(true);
  });
});
