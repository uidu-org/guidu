import React, { PureComponent } from 'react';

export default class DeviseHeader extends PureComponent<{
  brand: React.ReactNode;
}> {
  render() {
    const { brand } = this.props;

    return <div className="text-center mb-4">{brand}</div>;
  }
}
