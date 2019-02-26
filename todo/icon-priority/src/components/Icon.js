// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from '@atlaskit/theme';

const sizes = {
  small: '16px',
  medium: '24px',
  large: '32px',
  xlarge: '48px',
};

const getSize = props => {
  if (props.size) {
    return `height: ${sizes[props.size]}; width: ${sizes[props.size]};`;
  }
  return null;
};

export const IconWrapper = styled.span`
  ${getSize} color: ${p => p.primaryColor || 'currentColor'};
  display: inline-block;
  fill: ${p => p.secondaryColor || colors.background};
  flex-shrink: 0;
  line-height: 1;

  > svg {
    ${getSize} max-height: 100%;
    max-width: 100%;
    overflow: hidden;
    pointer-events: none;
    vertical-align: bottom;
  }
  /* Stop-color doesn't properly apply in chrome when the inherited/current color changes.
   * We have to initially set stop-color to inherit (either via DOM attribute or an initial CSS
   * rule) and then override it with currentColor for the color changes to be picked up.
   */
  stop {
    stop-color: currentColor;
  }
`;

type Props = {
  /** This is for internal use only in this package. If you want to use prop please consider using the
   * @atlaskit/icon package  */
  dangerouslySetGlyph?: string,
  /** String to use as the aria-label for the icon. Set to an empty string if you are rendering the icon with visible text to prevent accessibility label duplication. */
  label: string,
  /** Control the size of the icon */
  size?: 'small' | 'medium' | 'large' | 'xlarge',
};

export default class Icon extends Component<Props, {}> {
  render() {
    const { dangerouslySetGlyph, size } = this.props;

    return (
      <IconWrapper
        size={size}
        aria-label={this.props.label}
        dangerouslySetInnerHTML={{
          __html: dangerouslySetGlyph,
        }}
      />
    );
  }
}

export const size = Object.keys(sizes).reduce(
  (p, c) => Object.assign(p, { [c]: c }),
  {},
);
