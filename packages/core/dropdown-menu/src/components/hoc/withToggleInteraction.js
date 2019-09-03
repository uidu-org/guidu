// @flow

import { colors } from '@uidu/theme';
import PropTypes from 'prop-types';
import React, { Component, ComponentType, Node } from 'react';
import { selectionManagerContext } from '../../util/contextNamespace';
import getDisplayName from '../../util/getDisplayName';
import { KEY_ENTER, KEY_SPACE } from '../../util/keys';
import safeContextCall from '../../util/safeContextCall';
import type { Behaviors } from '../../types';

type Props = {
  /** Content to be displayed inside the item. Same as @uidu/item `children` prop. */
  children?: Node,
  /** Unique identifier for the item, so that selection state can be tracked when the dropdown
   * is opened/closed. */
  id: string,
  /** Set at mount to make the item appear checked. The user may interact with the
   * item after mount. See isSelected if you want to control the item state manually. */
  defaultSelected?: boolean,
  /** Causes the item to appear visually checked. Can be set at mount time, and updated after
   * mount. Changing the value will not cause onClick to be called. */
  isSelected?: boolean,
  /** Standard optional onClick handler */
  onClick?: Function,
};

// HOC that typically wraps @uidu/item
const withToggleInteraction = (
  WrappedComponent: ComponentType<any>,
  SelectionIcon: ComponentType<any>,
  getAriaRole: () => Behaviors,
) => {
  class WithToggleInteraction extends Component<Props> {
    static defaultProps = {
      onClick: () => {},
    };

    static contextTypes = {
      [selectionManagerContext]: PropTypes.object.isRequired,
    };

    componentDidMount() {
      const { defaultSelected, isSelected, id } = this.props;
      this.warnIfUseControlledAndUncontrolledState();

      this.callContextFn('setItemSelected', id, isSelected, defaultSelected);
    }

    UNSAFE_componentWillReceiveProps(nextProps: Object) {
      const { id, defaultSelected, isSelected } = nextProps;
      if (this.props.isSelected !== isSelected) {
        this.callContextFn('setItemSelected', id, isSelected, defaultSelected);
      }
    }

    getIconColors = (isSelected: boolean = false) => {
      if (isSelected) {
        return { primary: colors.B400, secondary: colors.N40 };
      }
      return { primary: colors.N40, secondary: colors.N40 };
    };

    warnIfUseControlledAndUncontrolledState = () => {
      if (process.env.NODE_ENV !== 'production') {
        if (this.props.defaultSelected && this.props.isSelected) {
          // eslint-disable-next-line no-console
          console.warn(
            'DropdownItem defaultSelected and isSelected props should not be used at the same time.',
          );
        }
      }
    };

    callContextFn = safeContextCall(this, selectionManagerContext);

    handleKeyboard = (event: KeyboardEvent) => {
      const { key } = event;
      if (key === KEY_ENTER || key === KEY_SPACE) {
        // We prevent default here to avoid page scroll
        event.preventDefault();

        this.handleItemActivated(event);
      }
    };

    handleItemActivated = (event: Event) => {
      if (this.props.onClick) {
        this.props.onClick(event);
      }
      this.callContextFn('itemClicked', this.props.id);
    };

    isSelectedInDropdown = () =>
      this.callContextFn('isItemSelected', this.props.id);

    render() {
      const { children, ...otherProps } = this.props;
      const isSelected = this.isSelectedInDropdown();
      const iconColors = this.getIconColors(isSelected);
      const ariaRole = getAriaRole();

      return (
        <WrappedComponent
          {...otherProps}
          role={ariaRole}
          aria-checked={isSelected}
          isSelected={isSelected}
          onClick={this.handleItemActivated}
          onKeyDown={this.handleKeyboard}
          elemBefore={
            <SelectionIcon
              primaryColor={iconColors.primary}
              secondaryColor={iconColors.secondary}
              size="medium"
              label=""
              isSelected={isSelected}
            />
          }
        >
          {children}
        </WrappedComponent>
      );
    }
  }
  WithToggleInteraction.displayName = `WithToggleInteraction(${getDisplayName(
    WrappedComponent,
  )})`;
  return WithToggleInteraction;
};

export default withToggleInteraction;
