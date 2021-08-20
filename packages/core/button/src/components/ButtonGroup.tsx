import React, { Children, cloneElement } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ButtonAppearances } from '../types';
import { StyledButton } from './Button';

const StyledButtonGroup = styled.div`
  ${tw`inline-flex space-x-1.5`}
  ${StyledButton} {
    ${tw`h-full`}
  }
`;

export type ButtonGroupProps = {
  /** The appearance to apply to all buttons. */
  appearance?: ButtonAppearances;
  /** Class applied to the group */
  className?: string;
  /** Buttons */
  children?: JSX.Element[];
};

export default function ButtonGroup({
  appearance,
  children,
  className,
}: ButtonGroupProps) {
  return (
    <StyledButtonGroup className={className}>
      {Children.map(children, (child, idx) => {
        if (!child) {
          return null;
        }
        return (
          <div key={idx}>
            {appearance
              ? cloneElement(child as JSX.Element, {
                  appearance,
                })
              : child}
          </div>
        );
      })}
    </StyledButtonGroup>
  );
}
