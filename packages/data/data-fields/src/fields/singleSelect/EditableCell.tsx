import Popup from '@uidu/popup';
import React, { useState } from 'react';
import SelectEditor from '../../components/editors/SelectEditor';

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
            onChange={(name, newValue) => setValue(newValue)}
          />
        </div>
      )}
      placement="bottom-start"
      trigger={(triggerProps) => (
        <div
          {...triggerProps}
          onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
        >
          {value}
        </div>
      )}
    />
  );
}
