import * as React from 'react';
import styled from 'styled-components';
import Question from '@atlaskit/icon/glyph/question';
import Expand from '@atlaskit/icon/glyph/arrow-down';

import Button from '../src';

const NarrowWrapper = styled.div`
  margin: 10px;
  padding: 10px;
  width: 190px;
  border: 1px solid red;

  & > * {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default () => (
  <NarrowWrapper>
    <div>
      <Button appearance="primary">I am wider than my parent</Button>
    </div>
    <div>
      <Button
        appearance="primary"
        iconBefore={<Question label="Icon before" />}
      >
        I am wider than my parent
      </Button>
    </div>
    <div>
      <Button appearance="primary" iconAfter={<Expand label="Icon after" />}>
        I am wider than my parent
      </Button>
    </div>
  </NarrowWrapper>
);
