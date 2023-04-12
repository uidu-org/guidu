import { CellContext } from '@tanstack/react-table';
import Popup, { TriggerProps } from '@uidu/popup';
import React, { useCallback, useState } from 'react';
import SelectEditor from '../../components/editors/SelectEditor';
import { Option, ValueRenderer } from './utils';

export default function EditableCell(props: CellContext<unknown, string>) {
  const { getValue, column, isEditing, closeEditing } = props;
  const [value, setValue] = useState(getValue());
  const [isOpen, setIsOpen] = useState(false);

  const Trigger = useCallback(
    (triggerProps: TriggerProps) => (
      <button
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...triggerProps}
        type="button"
        tw="w-full h-full flex items-center"
        onDoubleClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        <ValueRenderer {...props} value={value} />
      </button>
    ),
    [props, value],
  );

  const Content = useCallback(
    () => (
      <div style={{ width: column.getSize() }}>
        <SelectEditor
          {...props}
          onChange={(newValue) => {
            setValue(newValue);
            closeEditing();
          }}
          option={Option}
        />
      </div>
    ),
    [column, props, closeEditing],
  );

  return (
    <Popup
      isOpen={isEditing}
      onClose={closeEditing}
      content={Content}
      placement="bottom-start"
      offset={[-16, 16]}
      trigger={Trigger}
    />
  );
}
