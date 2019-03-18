// @flow

// TODO: work out how to import this from @uidu/item

type Color = string;
type Background = Color;
type Text = Color;

export type ItemState = {|
  background: Background,
  text: Text,
  secondaryText: Text,
|};

type Padding = {|
  x: number,
  y: number,
|};

export type ItemTheme = {|
  borderRadius: number,
  focus: {|
    outline: Color,
  |},
  padding: {|
    compact: Padding,
    default: Padding,
  |},
  default: ItemState,
  selected: ItemState,
  hover: ItemState,
  active: ItemState,
  disabled: ItemState,
|};
