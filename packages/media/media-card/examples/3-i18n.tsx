import * as React from 'react';
import {
  I18NWrapper,
  errorFileId,
  createStorybookContext,
} from '@uidu/media-test-helpers';
import { Card } from '../src';

const context = createStorybookContext();

export default () => (
  <I18NWrapper>
    <Card context={context} identifier={errorFileId} />
  </I18NWrapper>
);
