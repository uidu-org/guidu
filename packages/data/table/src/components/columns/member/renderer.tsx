import Avatar from '@uidu/avatar';
import React, { PureComponent } from 'react';

export default class Checkbox extends PureComponent<any> {
  render() {
    const { value } = this.props;
    return (
      <div className="d-flex align-items-center">
        <Avatar size="small" enableTooltip={false} borderColor="transparent" />
        <span className="ml-1">{value}</span>
      </div>
    );
  }
}
