import { Toggler } from '@uidu/data-controls';
import React from 'react';

export default function Configurator({ columnDefs, onDragEnd, ...rest }) {
  return (
    <>
      <div className="list-group">
        <div className="list-group-item px-3 px-xl-4 border-0">
          <h6 className="m-0">Visible fields</h6>
        </div>
      </div>
      <Toggler {...rest} columnDefs={columnDefs} onDragEnd={onDragEnd} />
    </>
  );
}
