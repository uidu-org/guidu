// @flow

export { default } from './components/Avatar';
export { default as AvatarItem } from './components/AvatarItem';
export { default as Presence } from './components/Presence';
export { default as Status } from './components/Status';
export { default as Skeleton } from './components/Skeleton';

export type { ThemeProps } from './theme';
export { theme } from './theme';

export type { ThemeItemType } from './theme/item';
export { themeItem } from './theme/item';

// The below are exposed for use by avatarGroup
export { AVATAR_SIZES, BORDER_WIDTH } from './styled/constants';
export type { AvatarClickType, AvatarPropTypes, SizeType } from './types';
export { withPseudoState } from './hoc';
export { getProps } from './helpers';
export { getBorderRadius, getInnerStyles } from './styled/utils';
