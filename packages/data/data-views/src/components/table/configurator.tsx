import { Toggler } from '@uidu/data-controls';
import React, { PureComponent } from 'react';

export default class Configurator extends PureComponent<any> {
  render() {
    const { gridColumnApi, columnDefs, onDragEnd } = this.props;
    return (
      <>
        <div className="list-group">
          <div className="list-group-item px-3 px-xl-4 border-0">
            <h6 className="m-0">Visible fields</h6>
          </div>
        </div>
        <Toggler
          {...this.props}
          columnDefs={columnDefs}
          onDragEnd={onDragEnd}
          gridColumnApi={gridColumnApi}
        />
      </>
    );
  }
}
