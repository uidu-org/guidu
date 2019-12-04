import { Toggler } from '@uidu/data-controls';
import React, { PureComponent } from 'react';
import { CheckSquare } from 'react-feather';

export default class Configurator extends PureComponent<any> {
  render() {
    const { onResize, rowHeight, columnDefs, onDragEnd, onToggle } = this.props;
    console.log(this.props);
    return (
      <>
        <div className="list-group">
          <div className="list-group-item px-3 px-xl-4 border-0">
            <h6 className="m-0">
              <CheckSquare size={16} className="mr-2" />
              Visible fields
            </h6>
          </div>
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
