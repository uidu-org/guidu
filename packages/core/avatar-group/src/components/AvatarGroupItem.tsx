import Avatar, { AvatarClickType, getProps } from '@uidu/avatar';
import { ButtonItem } from '@uidu/menu';
import React from 'react';

interface Props {
  avatar: Record<string, any>;
  isActive?: boolean;
  isHover?: boolean;
  index?: number;
  onAvatarClick?: AvatarClickType;
}

function AvatarGroupItem(props: Props) {
  const { avatar, onAvatarClick } = props;
  const { href, ...rest } = avatar;
  const enhancedProps = getProps(props);
  return (
    <ButtonItem
      isInteractive
      {...enhancedProps}
      iconBefore={
        <Avatar
          {...rest}
          borderColor="transparent"
          enableTooltip={false}
          size="small"
        />
      }
      onClick={(event: React.MouseEvent) => {
        if (typeof onAvatarClick === 'function') {
          onAvatarClick({ event, item: avatar });
        }
      }}
      // rel={avatar.target ? 'noopener noreferrer' : null}
      // target={avatar.target}
    >
      {avatar.name}
    </ButtonItem>
  );
}

export default AvatarGroupItem;
