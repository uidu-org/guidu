import * as React from 'react';
import { Wrapper, Left, Middle, Right } from './styled';

export interface SingleLineLayoutProps {
  left?: React.ReactNode;
  middle?: React.ReactNode;
  right?: React.ReactNode;
}

export class SingleLineLayout extends React.Component<SingleLineLayoutProps> {
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
