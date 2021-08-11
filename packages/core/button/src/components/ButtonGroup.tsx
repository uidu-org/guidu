import React, { Children, cloneElement } from 'react';
import { ButtonAppearances } from '../types';

export type ButtonGroupProps = {
  /** The appearance to apply to all buttons. */
  appearance?: ButtonAppearances;
  /** Buttons */
  children?: JSX.Element[];
};

export default function ButtonGroup({
  appearance,
  children,
}: ButtonGroupProps) {
  return (
    <div tw="inline-flex space-x-1.5">
      {Children.map(children, (child, idx) => {
        if (!child) {
          return null;
        }
        return (
          <div key={idx}>
            {appearance
              ? cloneElement(child as JSX.Element, { appearance })
              : child}
          </div>
        );
      })}
    </div>
  );
}
