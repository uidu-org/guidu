import * as React from 'react';
import { LinkProps } from 'react-router-dom';

export type ButtonAppearances =
  | 'default'
  | 'danger'
  | 'link'
  | 'primary'
  | 'subtle'
  | 'subtle-link'
  | 'warning';

// HtmlAttributes = AllHTMLAttributes - OnlyButtonProps
// We do this so onClick, and other props that overlap with html attributes,
// have the type defined in OnlyButtonProps.
type HtmlAttributes = Pick<
  React.AllHTMLAttributes<HTMLElement>,
  Exclude<keyof React.AllHTMLAttributes<HTMLElement>, keyof OnlyButtonProps>
>;

export type OnlyButtonProps = {
  /** The base styling to apply to the button */
  appearance?: ButtonAppearances;
  /** Set the button to autofocus on mount */
  autoFocus?: boolean;
  /** Add a classname to the button */
  className?: string;
  /** A custom component to use instead of the default button */
  component?: React.ComponentType<any>;
  /** Internal use only. Please use `ref` to forward refs */
  consumerRef?: ConsumerRef;
  /** Provides a url for buttons being used as a link */
  href?: string;
  /** Provides a url for buttons being used as a react-router-dom Link */
  to?: string | LinkProps['to'];
  /** Places an icon within the button, after the button's text */
  iconAfter?: React.ReactChild;
  /** Places an icon within the button, before the button's text */
  iconBefore?: React.ReactChild;
  /** Set if the button is disabled */
  isDisabled?: boolean;
  /**
   * Set if the button is loading. When isLoading is true, text is hidden, and
   * a spinner is shown in its place. The button maintains the width that it
   * would have if the text were visible.
   */
  isLoading?: boolean;
  /** Change the style to indicate the button is selected */
  isSelected?: boolean;
  /** Handler to be called on blur */
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseDown?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onMouseUp?: React.MouseEventHandler<HTMLElement>;
  /** Handler to be called on focus */
  onFocus?: React.FocusEventHandler<HTMLElement>;
  /** Set the amount of padding in the button */
  spacing?: Spacing;
  /** Pass target down to a link within the button component, if a href is provided */
  target?: string;
  /** Option to fit button width to its parent width */
  shouldFitContainer?: boolean;
};

export type ButtonProps = HtmlAttributes & OnlyButtonProps;

export type ConsumerRef =
  | string
  | ((instance: HTMLElement | null) => any)
  | React.RefObject<HTMLElement>
  | undefined;

export type Spacing = 'compact' | 'default' | 'none';

export type ThemeMode = 'dark' | 'light';

export type AppearanceStates = {
  default: { light: string; dark?: string };
  hover?: { light: string; dark?: string };
  active?: { light: string; dark?: string };
  disabled?: { light: string; dark?: string };
  selected?: { light: string; dark?: string };
  focusSelected?: { light: string; dark?: string };
};
