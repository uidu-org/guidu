import Button from '@uidu/button';
import { ButtonItem, MenuGroup, Section } from '@uidu/menu';
import Popup from '@uidu/popup';
import React, { useMemo, useState } from 'react';
import { MoreHorizontal } from 'react-feather';

export default function Actions({ actions = (row) => [], params }) {
  const [isOpen, setIsOpen] = useState(false);
  const perRowActions = useMemo(() => actions(params.row), [params.row]);

  return (
    <div tw="flex-grow justify-center flex">
      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="bottom-end"
        trigger={(triggerProps) => (
          <Button
            {...triggerProps}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen((prevIsOpen) => !prevIsOpen);
            }}
            type="button"
          >
            <MoreHorizontal size={14} />
          </Button>
        )}
        content={() => (
          <>
            {perRowActions.map(({ items, name, ...actionGroupProps }) => (
              <MenuGroup>
                <Section name={name} {...actionGroupProps}>
                  {items.map(({ onClick, ...action }, index) => (
                    <ButtonItem
                      {...action}
                      key={action.key || index}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onClick({ ...params });
                      }}
                    />
                  ))}
                </Section>
              </MenuGroup>
            ))}
          </>
        )}
      />
    </div>
  );
}
