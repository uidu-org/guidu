// @flow
import React from 'react';
import { shallow, mount } from 'enzyme';

import Avatar from '@atlaskit/avatar';
import { DropdownItem } from '@atlaskit/dropdown-menu';
import AvatarGroup from '../../AvatarGroup';
import MoreIndicator from '../../MoreIndicator';

const generateData = avatarCount => {
  const data = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < avatarCount; i++) {
    data.push({
      name: `Name ${i}`,
      src: `#${i}`,
      size: 'medium',
      appearance: 'circle',
      enableTooltip: true,
      href: '#',
    });
  }
  return data;
};

describe('AvatarGroup', () => {
  describe('maxCount of 3', () => {
    const maxCount = 3;

    it('should display single avatar', () => {
      const wrapper = shallow(
        <AvatarGroup
          appearance="stack"
          data={generateData(1)}
          maxCount={maxCount}
        />,
      );
      expect(wrapper).not.toBe(undefined);
      expect(wrapper.find(Avatar).length).toBe(1);
      expect(wrapper.find(MoreIndicator).length).toBe(0);
    });

    it('should display two avatars', () => {
      const wrapper = shallow(
        <AvatarGroup
          appearance="stack"
          data={generateData(2)}
          maxCount={maxCount}
        />,
      );
      expect(wrapper).not.toBe(undefined);
      expect(wrapper.find(Avatar).length).toBe(2);
      expect(wrapper.find(MoreIndicator).length).toBe(0);
    });

    it('should display three avatars', () => {
      const wrapper = shallow(
        <AvatarGroup
          appearance="stack"
          data={generateData(3)}
          maxCount={maxCount}
        />,
      );
      expect(wrapper).not.toBe(undefined);
      expect(wrapper.find(Avatar).length).toBe(3);
      expect(wrapper.find(MoreIndicator).length).toBe(0);
    });

    it('should display four avatars as 2 avatars and a +2', () => {
      const wrapper = mount(
        <AvatarGroup
          appearance="stack"
          data={generateData(4)}
          maxCount={maxCount}
        />,
      );
      expect(wrapper).not.toBe(undefined);
      expect(wrapper.find(Avatar).length).toBe(2);
      const moreIndicator = wrapper.find(MoreIndicator);
      expect(moreIndicator.length).toBe(1);
      expect(moreIndicator.prop('count')).toBe(2);
    });

    it('should pass moreButtonProps to the MoreIndicator', () => {
      const showMoreButtonProps = {
        tabIndex: -1,
      };
      const wrapper = mount(
        <AvatarGroup
          appearance="stack"
          data={generateData(4)}
          maxCount={maxCount}
          showMoreButtonProps={showMoreButtonProps}
        />,
      );
      expect(wrapper.find(MoreIndicator).props()).toEqual(
        expect.objectContaining(showMoreButtonProps),
      );
    });

    it('should not pass down the href prop to Avatar', () => {
      const wrapper = mount(
        <AvatarGroup
          appearance="stack"
          data={generateData(5)}
          maxCount={maxCount}
        />,
      );
      const moreIndicator = wrapper.find(MoreIndicator);
      moreIndicator.simulate('click');

      // href is not passed to Avatar in DropdownItem
      expect(
        wrapper
          .find(Avatar)
          .at(4)
          .prop('href'),
      ).toBeUndefined();

      // href is passed to DropdownItem
      expect(
        wrapper
          .find(DropdownItem)
          .at(1)
          .prop('href'),
      ).not.toBeUndefined();
    });
  });
});
