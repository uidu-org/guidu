import { CellContext, ColumnMeta } from '@tanstack/react-table';
import {
  CustomItem,
  CustomItemComponentProps,
  MenuGroup,
  Section,
} from '@uidu/menu';
import React, { FC, useCallback, useRef } from 'react';

type SelectEditorProps<T> = CellContext<T, string> & {
  option: FC<ColumnMeta<T, string>['options'][number]>;
  multiple?: boolean;
  onChange: (value: string | number) => void;
};

function OptionItem<T>({
  option,
  optionRenderer: Option,
  onChange,
}: {
  option: ColumnMeta<T, string>['options'][number];
  optionRenderer: SelectEditorProps<T>['option'];
  onChange: SelectEditorProps<T>['onChange'];
}) {
  const OptionComponent = useCallback(
    ({
      isSelected,
      isDisabled,
      ...componentProps
    }: CustomItemComponentProps) => (
      <button
        type="button"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...componentProps}
        tabIndex={-1}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onChange(option.id);
        }}
      >
        <Option value={option} />
      </button>
    ),
    [Option, option, onChange],
  );

  return <CustomItem key={option.id} component={OptionComponent} />;
}

export default function SelectEditor<T>(
  props: CellContext<T, string> & SelectEditorProps<T>,
) {
  const select = useRef(null);
  const { getValue, option: OptionRenderer, onChange } = props;
  const value = getValue();

  const { column, multiple } = props;
  const options = column.columnDef.meta?.options || [];

  return (
    <MenuGroup>
      <Section>
        {options.map((option) => (
          <OptionItem
            key={option.id}
            option={option}
            optionRenderer={OptionRenderer}
            onChange={onChange}
          />
        ))}
      </Section>
    </MenuGroup>
  );
}
