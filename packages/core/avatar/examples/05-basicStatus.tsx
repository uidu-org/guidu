import React from 'react';
import { Block, ShrinkWrap } from '../examples-util/helpers';
import { Status } from '../src';

export default () => (
  <Block>
    <ShrinkWrap>
      <Status status="approved" />
    </ShrinkWrap>
    <ShrinkWrap>
      <Status status="declined" />
    </ShrinkWrap>
    <ShrinkWrap>
      <Status status="locked" />
    </ShrinkWrap>
  </Block>
);
