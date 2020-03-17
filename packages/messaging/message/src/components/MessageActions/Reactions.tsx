import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@uidu/dropdown-menu';
import Tooltip from '@uidu/tooltip';
import React from 'react';
import { Smile } from 'react-feather';

export default function Reactions({
  options = ['👍', '👎', '😀', '❤️', '🎉'],
  reaction = undefined,
  onClick = option => {},
  onOpenChange,
}) {
  const handleClick = (e: Event, option) => {
    e.preventDefault();
    onClick(option);
  };

  return (
    <DropdownMenu
      trigger={
        <Tooltip
          tag="button"
          className="btn btn-sm bg-white text-muted p-2 d-flex align-items-center"
          position="top"
          content="Add a reaction"
          delay={0}
        >
          <Smile size={16} />
        </Tooltip>
      }
      triggerType="default"
      position="bottom"
      boundariesElement="scrollParent"
      onOpenChange={onOpenChange}
    >
      <DropdownItemGroup>
        {options.map(option => (
          <DropdownItem
            key={option}
            isSelected={reaction && reaction.id === option}
            onClick={e => handleClick(e, option)}
          >
            {option}
          </DropdownItem>
        ))}
      </DropdownItemGroup>
    </DropdownMenu>
  );
}
