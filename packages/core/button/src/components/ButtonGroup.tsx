import { gridSize } from '@uidu/theme';
import * as React from 'react';
import { ButtonAppearances } from '../types';

export type ButtonGroupProps = {
  /** The appearance to apply to all buttons. */
  appearance?: ButtonAppearances;
};

export const groupItemStyles = {
  flex: '1 0 auto',
  display: 'flex',

  /* margins don't flip when the layout uses dir="rtl", whereas pseudos do */
  '& + &::before': {
    content: `''`,
    display: 'inline-block',
    width: `${gridSize() / 2}px`,
  },
};

export default class ButtonGroup extends React.Component<ButtonGroupProps> {
  render() {
    const { appearance, children } = this.props;

    return (
      <div style={{ display: 'inline-flex' }}>
        {React.Children.map(children, (child, idx) => {
          if (!child) {
            return null;
          }
          return (
            <div key={idx} style={groupItemStyles}>
              {appearance
                ? React.cloneElement(child as JSX.Element, { appearance })
                : child}
            </div>
          );
        })}
      </div>
    );
  }
}
