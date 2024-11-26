import DefaultAvatar, {
  AvatarClickType,
  AvatarPropTypes,
  SizeType,
} from '@uidu/avatar';
import { MenuGroup } from '@uidu/menu';
import Popup, { TriggerProps } from '@uidu/popup';
import React, { ElementType, useCallback, useState } from 'react';
import { Grid, Stack } from '../styled/AvatarGroup';
import AvatarGroupItem from './AvatarGroupItem';
import MoreIndicator from './MoreIndicator';

const GROUP_COMPONENT = {
  grid: Grid,
  stack: Stack,
};
const MAX_COUNT = {
  grid: 11,
  stack: 5,
};

interface Props {
  /** Indicates the shape of the avatar. Most avatars are circular, but square avatars
   can be used for 'container' objects. */
  appearance: 'grid' | 'stack';
  /** Component used to render each avatar */
  avatar: ElementType<AvatarPropTypes>;
  /** The maximum number of avatars allowed in the grid */
  maxCount: number;
  /** Defines the size of the avatar */
  size: SizeType;
  /** Typically the background color that the avatar is presented on.
   Accepts any color argument that the CSS border-color property accepts. */
  borderColor?: string;
  /**
    Array of avatar data passed to each `avatar` component. These props will be spread
    on to the component passed into avatar.
  */
  data: AvatarPropTypes[];
  /** Handle the click event on the avatar item */
  onAvatarClick?: AvatarClickType;
  /** Take control of the click event on the more indicator. This will cancel
   the default dropdown behavior. */
  onMoreClick?: (event: React.MouseEvent) => unknown;
  /** Provide additional props to the MoreButton. Example use cases: altering
   tab order by providing tabIndex; adding onClick behaviour without losing the
   default dropdown */
  showMoreButtonProps?: Partial<React.HTMLAttributes<HTMLElement>>;

  boundariesElement?: 'viewport' | 'window' | 'scrollParent';
}

function MoreDropdown({
  max,
  total,
  data,
  onAvatarClick,
  showMoreButtonProps,
  borderColor,
  appearance,
  size,
  onMoreClick,
}: Omit<Props, 'maxCount'> & {
  max: number;
  total: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const items = data
    .slice(max)
    .map((avatar: AvatarPropTypes, index: number) => (
      <AvatarGroupItem
        avatar={avatar}
        key={index}
        onAvatarClick={onAvatarClick}
      />
    ));

  const MoreButton = useCallback(
    (props: TriggerProps) => (
      <div
        {...props}
        onClick={() => setIsOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setIsOpen((prev) => !prev);
        }}
      >
        <MoreIndicator
          ref={console.log}
          {...showMoreButtonProps}
          borderColor={borderColor}
          count={total - max}
          isStack={appearance === 'stack'}
          size={size}
        />
      </div>
    ),
    [total, max, borderColor, appearance, size, showMoreButtonProps],
  );

  const Content = useCallback(() => <MenuGroup>{items}</MenuGroup>, [items]);

  if (total <= max) return null;

  if (typeof onMoreClick === 'function') {
    return <MoreButton onClick={onMoreClick} />;
  }

  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={MoreButton}
      content={Content}
      placement="auto-start"
    />
  );
}

export default function AvatarGroup({
  appearance = 'stack',
  avatar: Avatar = DefaultAvatar,
  maxCount = 0,
  showMoreButtonProps = {},
  size = 'medium',
  borderColor,
  data,
  onAvatarClick,
}: Props) {
  // NOTE: conditionally defaulting the `maxCount` prop based on `appearance`
  const max = maxCount === 0 ? MAX_COUNT[appearance] : maxCount;
  const total = data.length;
  const Group = GROUP_COMPONENT[appearance];

  // Render (max - 1) avatars to leave space for moreIndicator
  const maxAvatar = total > max ? max - 1 : max;

  const items = data.slice(0, maxAvatar).map((avt, idx) => (
    <Avatar
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...avt}
      borderColor={borderColor}
      groupAppearance={appearance}
      key={avt.src || idx}
      onClick={avt.onClick || onAvatarClick}
      size={size}
      stackIndex={max - idx}
    />
  ));

  return (
    <Group size={size}>
      {items}
      <MoreDropdown
        max={+maxAvatar}
        total={total}
        data={data}
        onAvatarClick={onAvatarClick}
        showMoreButtonProps={showMoreButtonProps}
        borderColor={borderColor}
        appearance={appearance}
        size={size}
        avatar={Avatar}
      />
    </Group>
  );
}
