import { Color, Status as AkStatus } from '@uidu/status';
import * as React from 'react';
import { PureComponent } from 'react';

export interface Props {
  text: string;
  color: Color;
  localId?: string;
}

export default class Status extends PureComponent<Props, {}> {
  render() {
    const { text, color, localId } = this.props;
    return <AkStatus text={text} color={color} localId={localId} />;
  }
}
