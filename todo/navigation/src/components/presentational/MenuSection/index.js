// @flow

import React, { Component } from 'react';
import { gridSize as gridSizeFn } from '@atlaskit/theme';
import { css as parseCss } from 'emotion';
import Section from '../Section';
import type { MenuSectionProps } from './types';

const gridSize = gridSizeFn();

export default class MenuSection extends Component<MenuSectionProps> {
  static defaultProps = {
    alwaysShowScrollHint: false,
  };
  render() {
    const { alwaysShowScrollHint, id, children, parentId } = this.props;
    return (
      <Section
        id={id}
        parentId={parentId}
        alwaysShowScrollHint={alwaysShowScrollHint}
        shouldGrow
      >
        {({ css }) => {
          const menuCss = {
            ...css,
            paddingBottom: gridSize * 1.5,
          };

          return children({
            css: menuCss,
            className: parseCss(menuCss),
          });
        }}
      </Section>
    );
  }
}
