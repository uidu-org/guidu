import { Toggler } from '@uidu/data-controls';
import React from 'react';

export default function Configurator({ onDragEnd, tableInstance }) {
  return (
    <>
      <div className="list-group">
        <div className="px-3 border-0 list-group-item px-xl-4">
          <h6 className="m-0">Visible fields</h6>
        </div>
      </div>
      <Toggler onDragEnd={onDragEnd} tableInstance={tableInstance} />
    </>
  );
}
