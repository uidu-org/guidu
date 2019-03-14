import * as React from 'react';
import withDeprecationWarnings from './withDeprecationWarnings';
import Group, { GroupItem } from '../styled/ButtonGroup';
import { ButtonAppearances } from '../types';

export type ButtonGroupProps = {
  /** The appearance to apply to all buttons. */
  appearance?: ButtonAppearances;
};

class ButtonGroup extends React.Component<ButtonGroupProps> {
  render() {
    const { appearance, children } = this.props;

    return (
      <Group>
        {React.Children.map(children, (child, idx) => {
          if (!child) {
            return null;
          }
          return (
            <GroupItem key={idx}>
              {appearance
                ? React.cloneElement(child as JSX.Element, { appearance })
                : child}
            </GroupItem>
          );
        })}
      </Group>
    );
  }
}

export default withDeprecationWarnings(ButtonGroup);
