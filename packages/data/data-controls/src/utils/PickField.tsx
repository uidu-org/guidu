import { Column } from '@tanstack/react-table';
import Button from '@uidu/button';
import { MenuGroup, Section } from '@uidu/menu';
import Popup from '@uidu/popup';
import React, { useCallback, useState } from 'react';
import { ChevronDown } from 'react-feather';
import ColumnsList from './ColumnsList';

export default function PickField<T>({
  columns,
  onClick,
  label,
}: {
  columns: Column<T, unknown>[];
  onClick: (column: Column<T, unknown>) => void;
  label: string | React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const Trigger = useCallback(
    (triggerProps) => (
      <Button
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...triggerProps}
        appearance="link"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
        iconBefore={<ChevronDown size={16} />}
      >
        {label}
      </Button>
    ),
    [label],
  );

  const Content = useCallback(
    () => (
      <MenuGroup>
        <Section title="Pick a field">
          <ColumnsList
            columns={columns}
            onClick={(column) => {
              setIsOpen(false);
              onClick(column);
            }}
          />
        </Section>
      </MenuGroup>
    ),
    [columns, onClick],
  );

  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placement="bottom-start"
      trigger={Trigger}
      content={Content}
    />
  );
}
