export const MOBILE_NAV_HEIGHT = 54;

// responsive tiers (mobile > tablet > desktop)
export const TABLET_BREAKPOINT_MIN = 1024;
export const TABLET_BREAKPOINT_MAX = 1240;

export const MOBILE_BREAKPOINT_MAX = TABLET_BREAKPOINT_MIN - 1;
export const DESKTOP_BREAKPOINT_MIN = TABLET_BREAKPOINT_MAX + 1;

export const CONTAINER_NAV_STATE = {
  closed: 1,
  sections: 2,
  pages: 3,
  search: 4,
};
export const CARD_TYPES = {
  textOnly: 1,
  imgOnly: 2,
  textAndImg: 3,
};
export const ANIMATION_DIRECTIONS = { left: 1, right: 2 };
