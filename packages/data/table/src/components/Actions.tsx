import { DotsHorizontalIcon } from '@heroicons/react/solid';
import { CellContext, Row } from '@tanstack/react-table';
import Button from '@uidu/button';
import { RowActions } from '@uidu/data-manager';
import { ButtonItem, MenuGroup, Section } from '@uidu/menu';
import Popup from '@uidu/popup';
import React, { useCallback, useMemo, useState } from 'react';

export default function Actions<T>({
  actions = () => [],
  params,
}: {
  actions: (row: Row<T>) => RowActions<T>[];
  params: CellContext<T, unknown>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const perRowActions = useMemo(
    () => actions(params.row),
    [actions, params.row],
  );

  const Trigger = useCallback(
    (triggerProps) => (
      <Button
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...triggerProps}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen((prevIsOpen) => !prevIsOpen);
        }}
        type="button"
        tw="cursor-pointer"
      >
        <DotsHorizontalIcon tw="h-4 w-4" />
      </Button>
    ),
    [],
  );

  const Content = useCallback(
    () => (
      <>
        {perRowActions.map(({ items, name, ...actionGroupProps }) => (
          <MenuGroup key={name}>
            <Section
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...actionGroupProps}
            >
              {items.map(
                (
                  { onClick, component: Component = ButtonItem, ...action },
                  index,
                ) => (
                  <Component
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...action}
                    key={action.key || index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onClick({ ...params });
                    }}
                  />
                ),
              )}
            </Section>
          </MenuGroup>
        ))}
      </>
    ),
    [perRowActions, params],
  );

  return (
    <div tw="flex-grow justify-center flex">
      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="bottom-end"
        trigger={Trigger}
        content={Content}
      />
    </div>
  );
}
