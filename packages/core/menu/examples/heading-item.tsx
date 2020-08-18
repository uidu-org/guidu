import { R300 } from '@uidu/theme/colors';
import React from 'react';
import { HeadingItem } from '../src';

export default () => (
  <>
    <HeadingItem>Actions</HeadingItem>
    <HeadingItem cssFn={(css) => ({ ...css, color: R300 })}>
      Actions
    </HeadingItem>
  </>
);
