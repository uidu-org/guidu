import React, { Component } from 'react';
import { DropdownMenuStatefulProps, OnOpenChangeArgs } from '../types';
import StatelessMenu from './DropdownMenuStateless';

interface State {
  isOpen: boolean;
}

export default class DropdownMenu extends Component<
  DropdownMenuStatefulProps,
  State
> {
  static defaultProps = {
    appearance: 'default',
    boundariesElement: 'viewport',
    defaultOpen: false,
    isLoading: false,
    isOpen: false,
    onOpenChange: () => {},
    position: 'bottom left',
    isMenuFixed: false,
    shouldFitContainer: false,
    shouldFlip: true,
    triggerType: 'default',
    onPositioned: () => {},
  };

  state = {
    isOpen: this.props.defaultOpen,
  };

  UNSAFE_componentWillReceiveProps(nextProps: DropdownMenuStatefulProps) {
    if (nextProps.isOpen !== this.props.isOpen) {
      this.setState({ isOpen: nextProps.isOpen });
    }
  }

  handleOpenChange = (attrs: OnOpenChangeArgs, ...args: Array<any>) => {
    if (this.state.isOpen === attrs.isOpen) {
      return;
    }
    this.setState({ isOpen: attrs.isOpen });

    this.props.onOpenChange(attrs, ...args);
  };

  close = (...args: Array<any>) => {
    if (this.state.isOpen === false) {
      return;
    }
    this.setState({ isOpen: false });
    this.props.onOpenChange({ isOpen: false }, ...args);
  };

  render() {
    const { isOpen } = this.state;
    const {
      appearance,
      boundariesElement,
      children,
      isLoading,
      position,
      isMenuFixed,
      shouldFitContainer,
      shouldFlip,
      testId,
      trigger,
      triggerButtonProps,
      triggerType,
      onPositioned,
    } = this.props;

    return (
      <StatelessMenu
        appearance={appearance}
        boundariesElement={boundariesElement}
        isOpen={isOpen}
        isLoading={isLoading}
        onOpenChange={this.handleOpenChange}
        position={position}
        isMenuFixed={isMenuFixed}
        shouldFitContainer={shouldFitContainer}
        shouldFlip={shouldFlip}
        trigger={trigger}
        triggerButtonProps={triggerButtonProps}
        triggerType={triggerType}
        onPositioned={onPositioned}
        testId={testId}
      >
        {children}
      </StatelessMenu>
    );
  }
}
