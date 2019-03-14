// @flow
import * as React from 'react';
import { cleanProps } from '@atlaskit/analytics-next';

/**
 * Styling a button is complicated and there are a number of properties which inform its appearance.
 * We want to be able to style any arbitrary component like a button, but we don't want to pass all
 * of these appearance-related props through to the component or underlying DOM node. This component
 * acts as a layer which catches the appearance-related properties so that they can be used by
 * styled-components, then passes the rest of the props on to the custom component.
 */
import { DerivedButtonProps } from '../types';

class CustomComponentProxy extends React.Component<DerivedButtonProps> {
  render() {
    const {
      appearance,
      children,
      component,
      isActive,
      isDisabled,
      isFocus,
      isHover,
      isSelected,
      shouldFitContainer,
      fit,
      iconBefore,
      iconAfter,
      isLoading,
      ...proxiedProps
    } = cleanProps(this.props);
    if (!component) {
      throw new Error(
        'No custom component provided while trying to use custom button component',
      );
    }
    const ProxiedComponent = component;
    return <ProxiedComponent {...proxiedProps}>{children}</ProxiedComponent>;
  }
}

export default CustomComponentProxy;
