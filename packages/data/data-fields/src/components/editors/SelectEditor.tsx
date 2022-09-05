import { CellContext } from '@tanstack/react-table';
import { CustomItem, MenuGroup, Section } from '@uidu/menu';
import React, { useRef } from 'react';

export default function SelectEditor(
  props: CellContext<unknown, string> & {
    option;
    multiple?: boolean;
    onChange;
  },
) {
  const select = useRef(null);
  const { getValue, option: Option, onChange } = props;
  const value = getValue();

  const { column, multiple } = props;
  const options = column.columnDef.meta?.options || [];

  return (
    <MenuGroup>
      <Section>
        {options.map((option) => (
          <CustomItem
            component={(componentProps) => (
              <button
                type="button"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...componentProps}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onChange(option.id);
                }}
              >
                <Option value={option} />
              </button>
            )}
          />
        ))}
      </Section>
    </MenuGroup>
  );
}
