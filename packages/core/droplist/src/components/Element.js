// @flow
import React, { PureComponent, type Node } from 'react';
import { Anchor, Span } from '../styled/Item';

export const supportsVoiceOver = () => /Mac OS X/.test(navigator.userAgent);

export const getAriaRoles = () => ({
  checkbox: supportsVoiceOver() ? 'checkbox' : 'menuitemcheckbox',
  link: 'menuitem',
  option: 'option',
  radio: supportsVoiceOver() ? 'radio' : 'menuitemradio',
});
export const baseTypes = {
  default: 'link',
  values: ['link', 'radio', 'checkbox', 'option'],
};

type Props = {
  children?: Node,
  handleClick?: any => mixed,
  handleKeyPress?: any => mixed,
  handleMouseDown: any => mixed,
  handleMouseOut: any => mixed,
  handleMouseOver: any => mixed,
  handleMouseUp: any => mixed,
  href?: ?string,
  isActive?: boolean,
  isChecked?: boolean,
  isDisabled?: boolean,
  isFocused?: boolean,
  isHidden?: boolean,
  isPrimary?: boolean,
  isSelected?: boolean,
  target?: ?string,
  title?: ?string,
  /** Expects 'link' | 'radio' | 'checkbox' | 'option' */
  type?: string,
};

export default class Element extends PureComponent<Props, void> {
  // this prevents the focus ring from appearing when the element is clicked.
  // It doesn't interfere with the onClick handler
  handleMouseDown = (e: Event) => {
    e.preventDefault();
    this.props.handleMouseDown();
  };

  render() {
    const { props } = this;
    const {
      isActive,
      isChecked,
      isDisabled,
      isFocused,
      isHidden,
      isSelected,
      isPrimary,
    } = props;
    const type: string = this.props.type || '';
    const appearanceProps = {
      isActive,
      isChecked,
      isDisabled,
      isFocused,
      isHidden,
      isSelected,
      isPrimary,
    };

    const ariaProps = {
      'aria-checked': !!isChecked,
      'aria-disabled': !!isDisabled,
      'aria-hidden': !!isHidden,
      'aria-selected': !!isSelected,
    };
    const ariaRoles = getAriaRoles();
    const commonProps = {
      'data-role': 'droplistItem',
      onClick: props.handleClick,
      onKeyPress: props.handleKeyPress,
      onMouseDown: this.handleMouseDown,
      onMouseOut: props.handleMouseOut,
      onMouseOver: props.handleMouseOver,
      onMouseUp: props.handleMouseUp,
      role: ariaRoles[type],
      title: props.title,
      tabIndex: props.type === 'option' ? null : 0,
    };
    const testingProps =
      process.env.NODE_ENV === 'test'
        ? {
            'data-test-active': isActive,
            'data-test-checked': isChecked,
            'data-test-disabled': isDisabled,
            'data-test-hidden': isHidden,
            'data-test-selected': isSelected,
          }
        : {};
    const consolidatedProps = {
      ...appearanceProps,
      ...ariaProps,
      ...commonProps,
      ...testingProps,
    };

    if (props.href && !isDisabled) {
      return (
        <Anchor href={props.href} target={props.target} {...consolidatedProps}>
          {props.children}
        </Anchor>
      );
    }

    return <Span {...consolidatedProps}>{props.children}</Span>;
  }
}
