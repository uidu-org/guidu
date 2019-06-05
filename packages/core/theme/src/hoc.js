import React, { forwardRef } from 'react';
import Theme from './components/Theme';

// Pre-executes the theme and passes it as a prop to the supplied component.
// This is useful for ensuring that the current theme is accessible as props
// in styled-components.

export function withTheme(InnerComponent) {
  return forwardRef((props, ref) => {
    return (
      <Theme.Consumer>
        {tokens => <InnerComponent {...props} ref={ref} theme={tokens} />}
      </Theme.Consumer>
    );
  });
}
