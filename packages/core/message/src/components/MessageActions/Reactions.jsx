import React, { Component } from 'react';
import Tooltip from '@uidu/tooltip';
import DropdownMenu, { DropdownItem } from '@uidu/dropdown-menu';

import { Smile } from 'react-feather';

export default class Reactions extends Component {
  static defaultProps = {
    reaction: undefined,
    onClick: () => {},
  };

  render() {
    const { onClick, reaction } = this.props;
    return (
      <DropdownMenu
        trigger={
          <Tooltip
            tag="button"
            className="btn btn-sm bg-white border py-1 px-3 d-flex align-items-center"
            placement="top"
            content="Add a reaction"
            delay={0}
          >
            <Smile size={16} />
          </Tooltip>
        }
        triggerType="default"
        position="top middle"
        boundariesElement="viewport"
        onOpenChange={e => console.log('dropdown opened', e)}
      >
        <div className="d-flex">
          {['👍', '👎', '😀', '❤️', '🎉'].map(option => (
            <DropdownItem
              isSelected={reaction && reaction.id === option}
              onClick={() => onClick(option)}
            >
              {option}
            </DropdownItem>
          ))}
        </div>
      </DropdownMenu>
    );
  }
}
