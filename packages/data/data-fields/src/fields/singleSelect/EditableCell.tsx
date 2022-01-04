import Popup from '@uidu/popup';
import React, { useState } from 'react';
import SelectEditor from '../../components/editors/SelectEditor';
import { Option, ValueRenderer } from './Cell';

export default function EditableCell(params) {
  const { value: initialValue, column } = params;
  const [value, setValue] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      content={() => (
        <div style={{ width: column.width }}>
          <SelectEditor
            {...params}
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
          <ValueRenderer {...params} value={value} />
        </div>
      )}
    />
  );
}
