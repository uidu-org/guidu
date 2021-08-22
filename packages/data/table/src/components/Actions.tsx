import Button from '@uidu/button';
import { ButtonItem, MenuGroup, Section } from '@uidu/menu';
import Popup from '@uidu/popup';
import React, { useState } from 'react';
import { MoreHorizontal } from 'react-feather';

export default function Actions({ actions = [], ...rest }) {
  const [isOpen, setIsOpen] = useState(false);
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
            className="btn btn-sm d-flex align-items-center px-2 justify-content-between"
          >
            <MoreHorizontal size={14} />
          </Button>
        )}
        content={() => (
          <>
            {actions.map(({ items, name, ...actionGroupProps }) => (
              <MenuGroup>
                <Section name={name} {...actionGroupProps}>
                  {items.map(({ onClick, ...action }, index) => (
                    <ButtonItem
                      {...action}
                      key={action.key || index}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onClick({ ...rest });
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
