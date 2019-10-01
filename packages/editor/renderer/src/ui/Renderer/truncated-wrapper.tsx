import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';

export interface TruncatedWrapperProps {
  height?: number;
  backgroundColor?: string;
}

interface FadeOutProps {
  height: number;
  fadeHeight: number;
  backgroundColor: string;
}

const FadeOut = styled.div<FadeOutProps>`
  position: relative;
  overflow-y: hidden;
  max-height: ${({ height }: FadeOutProps) => height}px;
  &::after {
    content: '';
    position: absolute;
    top: ${({ height, fadeHeight }: FadeOutProps) => height - fadeHeight}px;
    bottom: 0;
    left: 0;
    right: 0;
    /* Using 'rgba(255, 255, 255, 0)' because 'transparent' breaks the gradient in Safari 11 */
    background-image: ${({ backgroundColor }: FadeOutProps) =>
      `linear-gradient(rgba(255, 255, 255, 0),  ${backgroundColor})`};
  }
`;

export class TruncatedWrapper extends Component<TruncatedWrapperProps, {}> {
  constructor(props: TruncatedWrapperProps) {
    super(props);
  }

  render() {
    const { height = 95, backgroundColor = 'white', children } = this.props;
    return (
      <FadeOut
        height={height}
        fadeHeight={24}
        backgroundColor={backgroundColor}
      >
        {children}
      </FadeOut>
    );
  }
}
