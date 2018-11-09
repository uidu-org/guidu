// @flow
import React from 'react';
import { mount } from 'enzyme';

import { ContainerNavigation, ProductNavigation } from '../../primitives';
import { light } from '../../../../../../theme';

describe('NavigationNext components: ContentNavigation primitives', () => {
  describe('ContainerNavigation', () => {
    it('should ALWAYS use the `light` theme', () => {
      const wrapper = mount(
        <ContainerNavigation isPeeking>
          <p>This is a text</p>
        </ContainerNavigation>,
      );

      expect(wrapper.find('ThemeProvider').props().theme).toMatchObject({
        mode: light,
      });
    });

    it('should ALWAYS use the `container` context', () => {
      const wrapper = mount(
        <ContainerNavigation isPeeking>
          <p>This is a text</p>
        </ContainerNavigation>,
      );

      expect(wrapper.find('ThemeProvider').props().theme.context).toBe(
        'container',
      );
    });

    it('should have scrollable effect', () => {
      const wrapper = mount(
        <ContainerNavigation isPeeking>
          <p>This is a text</p>
        </ContainerNavigation>,
      );

      expect(wrapper.find('ScrollProvider').length).toBe(1);
    });

    it('should render the received children', () => {
      const wrapper = mount(
        <ContainerNavigation isPeeking>
          <p>This is a text</p>
        </ContainerNavigation>,
      );

      expect(wrapper.text()).toBe('This is a text');
    });
  });

  describe('ProductNavigation', () => {
    it('should use the `light` theme if another theme was not provided', () => {
      const wrapper = mount(
        <ProductNavigation isPeeking>
          <p>This is a text</p>
        </ProductNavigation>,
      );

      expect(
        wrapper
          .find('ThemeProvider')
          .props()
          .theme(),
      ).toMatchObject({
        mode: light,
      });
    });

    it('should ALWAYS use the `product` context', () => {
      const wrapper = mount(
        <ProductNavigation isPeeking>
          <p>This is a text</p>
        </ProductNavigation>,
      );

      expect(
        wrapper
          .find('ThemeProvider')
          .props()
          .theme().context,
      ).toBe('product');
    });

    it('should have scrollable effect', () => {
      const wrapper = mount(
        <ProductNavigation isPeeking>
          <p>This is a text</p>
        </ProductNavigation>,
      );

      expect(wrapper.find('ScrollProvider').length).toBe(1);
    });

    it('should render the received children', () => {
      const wrapper = mount(
        <ProductNavigation isPeeking>
          <p>This is a text</p>
        </ProductNavigation>,
      );

      expect(wrapper.text()).toBe('This is a text');
    });
  });
});
