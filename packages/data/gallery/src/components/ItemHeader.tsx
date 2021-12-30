import React, { PureComponent } from 'react';

export default class ItemHeader extends PureComponent<any> {
  render() {
    const { item, primary } = this.props;
    if (primary) {
      return (
        <div
          className="border-0 card-header d-flex align-items-center"
          style={{ fontWeight: 500, height: 42 }}
        >
          <span tw="truncate">
            {primary.valueGetter
              ? primary.valueGetter({
                  data: item,
                  value: item[primary.field],
                })
              : item[primary.field]}
          </span>
        </div>
      );
    }

    return null;
  }
}
