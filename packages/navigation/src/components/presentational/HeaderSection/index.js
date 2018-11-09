// @flow

import React, { Component } from 'react';
import { gridSize as gridSizeFn } from '@atlaskit/theme';
import { css as parseCss } from 'emotion';
import Section from '../Section';
import type { HeaderSectionProps } from './types';

const gridSize = gridSizeFn();

export default class HeaderSection extends Component<HeaderSectionProps> {
  render() {
    const { children, id, parentId } = this.props;
    return (
      <Section id={id} key={id} parentId={parentId}>
        {({ css }) => {
          const headerCss = {
            ...css,
            paddingTop: gridSize * 2.5,
          };

          return children({
            css: headerCss,
            className: parseCss(headerCss),
          });
        }}
      </Section>
    );
  }
}
