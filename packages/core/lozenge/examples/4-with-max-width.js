// @flow
import React from 'react';
import Lozenge from '../src';

export default () => (
  <div>
    <p>
      <Lozenge appearance="success" maxWidth={150}>
        very very very wide text which truncates
      </Lozenge>
    </p>
    <p>
      <Lozenge appearance="success" maxWidth={'10vw'} isBold>
        very very very wide text which truncates
      </Lozenge>
    </p>
  </div>
);
