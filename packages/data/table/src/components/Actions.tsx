import { ButtonItem, MenuGroup, Section } from '@uidu/menu';
import Popup from '@uidu/popup';
import React, { useState } from 'react';
import { MoreHorizontal } from 'react-feather';

export default function Actions({ actions = [], ...rest }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex-grow-1 justify-content-center d-flex">
      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        // position="bottom left"
        trigger={(triggerProps) => (
          <button
            {...triggerProps}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(true);
            }}
            type="button"
            className="btn btn-sm d-flex align-items-center px-2 justify-content-between"
          >
            <MoreHorizontal size={14} />
          </button>
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
