// @flow
import React, { type ComponentType } from 'react';
import Example, { ToggleTitle, Toggle } from '../src/Example';
import { AkCodeBlock } from '@atlaskit/code';
import { mount } from 'enzyme';
import cases from 'jest-in-case';

type Props = {
  Component?: ComponentType<any>,
  language?: string,
  source?: string,
  title?: string,
};

cases(
  '<Example />',
  ({
    props = {},
    should,
  }: {
    props?: Props,
    should: (any, props: Props) => mixed,
  }) => {
    let defaultProps = {
      Component: () => <div>Mock Component</div>,
      language: 'javascript',
      source: '<div>Mock Component</div>',
      title: 'Some title we have',
      packageName: '@atlaskit/somewhere',
    };

    let combinedProps = { ...defaultProps, ...props };
    let Mock = mount(<Example {...combinedProps} />);

    should(Mock, combinedProps);
  },
  [
    {
      name: 'default render',
      should: (Mock, { Component, language, source, title }) => {
        expect(Mock.find(Component).length).toBe(1);
        expect(Mock.state()).toMatchObject({
          isSourceVisible: false,
          isHover: false,
        });
        expect(Mock.find(ToggleTitle).text()).toBe(title);
      },
    },
    {
      name: 'toggle sourceIsVisible',
      should: (Mock, { language, source, title }) => {
        expect(Mock.find(AkCodeBlock).length).toBe(0);
        let toggle = Mock.find(Toggle).simulate('click');

        let CodeBlock = Mock.find(AkCodeBlock);
        expect(CodeBlock.prop('text')).toBe(source);
        expect(CodeBlock.prop('language')).toBe(language);
      },
    },
  ],
);
