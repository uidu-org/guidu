// @flow
import React, { type Node } from 'react';

import ScrollHintWrapper from '../styled/ScrollHintWrapper';
import ScrollHintScrollContainer from '../styled/ScrollHintScrollContainer';

type Props = {
  children?: Node,
  hasScrollHintTop?: boolean,
  scrollRef?: () => void,
};

const ContainerNavigationChildren = ({
  children,
  hasScrollHintTop,
  scrollRef,
}: Props) => (
  <ScrollHintWrapper hasScrollHintTop={hasScrollHintTop}>
    <ScrollHintScrollContainer innerRef={scrollRef}>
      {children}
    </ScrollHintScrollContainer>
  </ScrollHintWrapper>
);
ContainerNavigationChildren.displayName = 'ContainerNavigationChildren';
export default ContainerNavigationChildren;
