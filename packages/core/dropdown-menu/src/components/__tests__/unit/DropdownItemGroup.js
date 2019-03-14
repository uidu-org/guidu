// @flow

import React from 'react';
import { mount } from 'enzyme';
import { ItemGroup } from '@uidu/item';

import { DropdownItemGroup } from '../../..';

describe('dropdown menu - DropdownItemGroup', () => {
  test('should pass title prop to generic ItemGroup component', () => {
    const wrapper = mount(<DropdownItemGroup title="Heading" />);
    expect(wrapper.find(ItemGroup).prop('title')).toBe('Heading');
  });

  test('should pass children to generic ItemGroup component', () => {
    const wrapper = mount(
      <DropdownItemGroup>
        <span id="group-child" />
      </DropdownItemGroup>,
    );
    expect(wrapper.find('#group-child').length).toBe(1);
  });
});
