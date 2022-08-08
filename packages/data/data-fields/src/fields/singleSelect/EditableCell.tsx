import { CellContext } from '@tanstack/react-table';
import Popup from '@uidu/popup';
import React, { useState } from 'react';
import SelectEditor from '../../components/editors/SelectEditor';
import { Option, ValueRenderer } from './Cell';

export default function EditableCell(props: CellContext<any, string>) {
  const { getValue, column } = props;
  const [value, setValue] = useState(getValue());
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      content={() => (
        <div style={{ width: column.width }}>
          <SelectEditor
            {...props}
            onChange={(newValue) => {
              setValue(newValue);
              setIsOpen(false);
            }}
            option={Option}
          />
        </div>
      )}
      placement="bottom-start"
      offset={[-16, 8]}
      trigger={(triggerProps) => (
        <div
          {...triggerProps}
          onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
        >
          <ValueRenderer {...props} value={value} />
        </div>
      )}
    />
  );
}
