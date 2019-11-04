import Switcher from '@atlaskit/icon/glyph/app-switcher';
import * as React from 'react';
import Button from '../src';

export default () => (
  <div className="sample">
    <Button
      iconBefore={<Switcher label="app switcher" />}
      component={React.forwardRef<
        HTMLElement,
        React.AllHTMLAttributes<HTMLElement>
      >((props, ref) => (
        <header {...props} ref={ref} style={{ backgroundColor: 'pink' }} />
      ))}
    >
      App Switcher custom component
    </Button>
  </div>
);
