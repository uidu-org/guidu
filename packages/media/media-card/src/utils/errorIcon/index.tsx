import * as React from 'react';
import { Component } from 'react';
import WarningIcon from '@atlaskit/icon/glyph/editor/warning';

import { ErrorIconWrapper } from './styled';

export class ErrorIcon extends Component<{}, {}> {
  render() {
    return (
      <ErrorIconWrapper>
        <WarningIcon label="Error" size="small" />
      </ErrorIconWrapper>
    );
  }
}
