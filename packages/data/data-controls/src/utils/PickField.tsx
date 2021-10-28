import { ButtonItem, Section } from '@uidu/menu';
import Popup from '@uidu/popup';
import React, { useState } from 'react';
import { ChevronDown } from 'react-feather';

export default function PickField({
  columnDefs,
  onClick,
  label,
  isDefaultOpen,
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Popup
        isOpen={isOpen}
        trigger={(triggerProps) => (
          <a
            {...triggerProps}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
            tw="px-3 flex items-center"
          >
            {label} <ChevronDown size={16} />
          </a>
        )}
        content={() => {
          return (
            <Section className="px-3">
              {columnDefs.map((columnDef) => {
                return (
                  <ButtonItem
                    tw="px-3 flex items-center"
                    key={columnDef.id}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      onClick(columnDef);
                    }}
                    {...(columnDef.icon
                      ? {
                          iconBefore: (
                            <span
                              style={{ width: 22, display: 'inline-block' }}
                            >
                              {columnDef.icon}
                            </span>
                          ),
                        }
                      : {})}
                  >
                    {columnDef.name}
                  </ButtonItem>
                );
              })}
            </Section>
          );
        }}
      />
    </>
  );
}
