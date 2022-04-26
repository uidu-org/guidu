import Button from '@uidu/button';
import Popup from '@uidu/popup';
import Tooltip from '@uidu/tooltip';
import React, { useState } from 'react';
import { Smile } from 'react-feather';

export default function Reactions({
  options = ['👍', '👎', '😀', '❤️', '🎉'],
  reaction = undefined,
  onClick = (option) => {},
  onOpenChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: Event, option) => {
    e.preventDefault();
    onClick(option);
  };

  return (
    <Popup
      isOpen={isOpen}
      trigger={(triggerProps) => (
        <Tooltip
          tag="button"
          className="p-2 bg-white btn btn-sm text-muted d-flex align-items-center"
          position="top"
          content="Add a reaction"
          delay={0}
        >
          <Button
            {...triggerProps}
            onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
            iconBefore={<Smile size={16} />}
          />
        </Tooltip>
      )}
      triggerType="default"
      position="bottom"
      boundariesElement="scrollParent"
      onOpenChange={onOpenChange}
      content={() => (
        <div tw="grid grid-cols-4 p-6">
          {options.map((option) => (
            <Button
              key={option}
              appearance="link"
              isSelected={reaction && reaction.id === option}
              onClick={(e) => handleClick(e, option)}
              tw="border rounded hover:bg-gray-100"
            >
              <div tw="w-5 h-5 flex items-center justify-center">{option}</div>
            </Button>
          ))}
        </div>
      )}
    />
  );
}
