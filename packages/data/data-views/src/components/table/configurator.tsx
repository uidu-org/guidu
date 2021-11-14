import { Toggler } from '@uidu/data-controls';
import React from 'react';

export default function Configurator({ columnDefs, onDragEnd, ...rest }) {
  return (
    <>
      <div tw="">
        <div tw="px-3 xl:px-4 flex items-center">
          <h6 className="m-0">Visible fields</h6>
        </div>
      </div>
      <Toggler {...rest} columnDefs={columnDefs} onDragEnd={onDragEnd} />
    </>
  );
}
