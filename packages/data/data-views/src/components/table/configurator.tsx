import { Grouper, Resizer, Toggler } from '@uidu/data-controls';
import React, { PureComponent } from 'react';

export default class Configurator extends PureComponent<any> {
  render() {
    const { onResize, rowHeight, columnDefs, onDragEnd, onToggle } = this.props;
    return (
      <>
        <Grouper {...this.props} />
        <div className="px-4">
          <h5>Maybe row height</h5>
        </div>
        <Resizer onResize={onResize} rowHeight={rowHeight} {...this.props} />
        <div className="px-4">
          <h5>Visible fields (old toggler)</h5>
        </div>
        <Toggler
          columnDefs={columnDefs}
          onDragEnd={onDragEnd}
          onToggle={onToggle}
          {...this.props}
        />
      </>
    );
  }
}
