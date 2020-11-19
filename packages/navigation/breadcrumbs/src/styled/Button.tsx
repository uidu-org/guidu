import Button, { ButtonProps } from '@uidu/button';
import React from 'react';

interface Props extends ButtonProps {
  truncationWidth?: number;
}

export default React.forwardRef<HTMLButtonElement, Props>(
  ({ truncationWidth, ...props }, ref) => {
    return (
      <Button
        {...props}
        ref={ref}
        theme={(currentTheme, themeProps) => {
          const { buttonStyles, ...rest } = currentTheme(themeProps);
          return {
            buttonStyles: {
              ...buttonStyles,
              fontWeight: 400,
              ...(truncationWidth
                ? { maxWidth: `${truncationWidth}px` }
                : { flexShrink: 1, minWidth: 0 }),
            },
            ...rest,
          };
        }}
      />
    );
  },
);
