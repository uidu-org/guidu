import { Toggler } from '@uidu/data-controls';
import React, { PureComponent } from 'react';

export default class Configurator extends PureComponent<any> {
  render() {
    const { onResize, rowHeight, columnDefs, onDragEnd, onToggle } = this.props;
    return (
      <div>
        <ul>
          <li>Column count</li>
          <li>Visible fields (old toggler)</li>
          <Toggler
            columnDefs={columnDefs}
            onDragEnd={onDragEnd}
            onToggle={onToggle}
            {...this.props}
          />
        </ul>
      </div>
    );
  }
}
