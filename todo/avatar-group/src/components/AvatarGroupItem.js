// @flow
import React, { Component } from 'react';
import { DropdownItem } from '@atlaskit/dropdown-menu';
import Avatar, { withPseudoState, getProps } from '@atlaskit/avatar';
import { getBackgroundColor } from '../styled/AvatarGroup';

type Props = {
  avatar: {
    [string]: any,
  },
  isActive: boolean,
  isHover: boolean,
  index: number,
  onAvatarClick: Function,
};

class AvatarGroupItem extends Component<Props> {
  render() {
    const { avatar, onAvatarClick } = this.props;
    const borderColor = getBackgroundColor(this.props);
    const enhancedProps = getProps(this);
    return (
      <DropdownItem
        isInteractive
        {...enhancedProps}
        elemBefore={
          <Avatar
            {...avatar}
            borderColor={borderColor}
            enableTooltip={false}
            size="small"
          />
        }
        href={avatar.href}
        onClick={(event: KeyboardEvent | MouseEvent) => {
          if (typeof onAvatarClick === 'function') {
            onAvatarClick({ event, item: avatar });
          }
        }}
        rel={avatar.target ? 'noopener noreferrer' : null}
        target={avatar.target}
      >
        {avatar.name}
      </DropdownItem>
    );
  }
}

export default withPseudoState(AvatarGroupItem);
