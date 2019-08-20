import React from 'react';
import { Block, ShrinkWrap } from '../examples-util/helpers';
import { Presence } from '../src';

export default () => (
  <Block>
    <ShrinkWrap>
      <Presence presence="online" />
    </ShrinkWrap>
    <ShrinkWrap>
      <Presence presence="busy" />
    </ShrinkWrap>
    <ShrinkWrap>
      <Presence presence="focus" />
    </ShrinkWrap>
    <ShrinkWrap>
      <Presence presence="offline" />
    </ShrinkWrap>
  </Block>
);
