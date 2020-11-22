import Avatar, {
  AvatarClickType,
  AvatarPropTypes,
  SizeType,
} from '@uidu/avatar';
import DropdownMenu, { DropdownItemGroup } from '@uidu/dropdown-menu';
import React, { Component, ElementType } from 'react';
import { Grid, Stack } from '../styled/AvatarGroup';
import AvatarGroupItem from './AvatarGroupItem';
import MoreIndicator, { MoreIndicatorProps } from './MoreIndicator';

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

export default class AvatarGroup extends Component<Props> {
  static defaultProps = {
    appearance: 'stack',
    avatar: Avatar,
    maxCount: 0,
    showMoreButtonProps: {},
    size: 'medium',
  };

  renderMoreDropdown(max: number, total: number) {
    const {
      appearance,
      data,
      borderColor,
      onMoreClick,
      showMoreButtonProps,
      onAvatarClick,
      size,
      boundariesElement,
    } = this.props;

    // bail if there's not enough items
    if (total <= max) return null;

    // prepare the button -- we'll use it twice
    const MoreButton = (props: MoreIndicatorProps) => (
      <MoreIndicator
        {...showMoreButtonProps}
        borderColor={borderColor}
        count={total - max}
        isStack={appearance === 'stack'}
        size={size}
        {...(props as any)}
      />
    );

    // bail if the consumer wants to handle onClick
    if (typeof onMoreClick === 'function') {
      return <MoreButton onClick={onMoreClick} />;
    }

    // crop and prepare the dropdown items
    const items = data
      .slice(max)
      .map((avatar: AvatarPropTypes, index: number) => (
        <AvatarGroupItem
          avatar={avatar}
          key={index}
          onAvatarClick={onAvatarClick}
        />
      ));

    return (
      <DropdownMenu
        trigger={<MoreButton />}
        position="bottom right"
        boundariesElement={boundariesElement}
        shouldFlip
      >
        <DropdownItemGroup>{items}</DropdownItemGroup>
      </DropdownMenu>
    );
  }

  render() {
    const {
      avatar: Item,
      appearance,
      borderColor,
      data,
      maxCount,
      onAvatarClick,
      size,
    }: Props = this.props;
    // NOTE: conditionally defaulting the `maxCount` prop based on `appearance`
    const max = maxCount === 0 ? MAX_COUNT[appearance] : maxCount;
    const total = data.length;
    const Group = GROUP_COMPONENT[appearance];

    // Render (max - 1) avatars to leave space for moreIndicator
    const maxAvatar = total > max ? max - 1 : max;

    const items = data
      .slice(0, maxAvatar)
      .map((avatar, idx) => (
        <Item
          {...avatar}
          borderColor={borderColor}
          groupAppearance={appearance}
          key={idx}
          onClick={avatar.onClick || onAvatarClick}
          size={size}
          stackIndex={max - idx}
        />
      ));

    return (
      <Group size={size}>
        {items}
        {this.renderMoreDropdown(+maxAvatar, total)}
      </Group>
    );
  }
}
