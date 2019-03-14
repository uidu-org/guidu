import * as React from 'react';
import { Wrapper, Left, Middle, Right } from './styled';

export interface MultiLineLayoutProps {
  left?: React.ReactNode;
  middle?: React.ReactNode;
  right?: React.ReactNode;
}

export class MultiLineLayout extends React.Component<MultiLineLayoutProps> {
  render() {
    const { left, middle, right } = this.props;
    return (
      <Wrapper>
        <Left>{left}</Left>
        <Middle>{middle}</Middle>
        <Right>{right}</Right>
      </Wrapper>
    );
  }
}
