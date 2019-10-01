import Button from '@uidu/button';
import Tooltip from '@uidu/tooltip';
import * as React from 'react';
import { baseStyles, getButtonStyles } from './styles';

export type ButtonAppearance = 'subtle' | 'danger';
export interface Props {
  title?: string;
  icon?: React.ReactElement<any>;
  iconAfter?: React.ReactElement<any>;
  onClick?: React.MouseEventHandler;
  onMouseEnter?: <T>(event: React.MouseEvent<T>) => void;
  onMouseLeave?: <T>(event: React.MouseEvent<T>) => void;
  selected?: boolean;
  disabled?: boolean;
  appearance?: ButtonAppearance;
  href?: string;
  target?: string;
  children?: React.ReactNode;
  className?: string;
}

export default ({
  title,
  icon,
  iconAfter,
  onClick,
  onMouseEnter,
  onMouseLeave,
  selected,
  disabled,
  href,
  target,
  appearance = 'subtle',
  children,
  className,
}: Props) => {
  return (
    <Tooltip content={title} hideTooltipOnClick={true} position="top">
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <Button
          className={className}
          theme={(adgTheme, themeProps) => {
            const { buttonStyles, ...rest } = adgTheme(themeProps);
            return {
              buttonStyles: {
                ...buttonStyles,
                ...baseStyles,
                ...(appearance === 'danger' &&
                  getButtonStyles({
                    appearance,
                    state: themeProps.state,
                    mode: themeProps.mode,
                  })),
              },
              ...rest,
            };
          }}
          aria-label={title}
          spacing="compact"
          href={href}
          target={target}
          appearance={appearance}
          aria-haspopup={true}
          iconBefore={icon || undefined}
          iconAfter={iconAfter}
          onClick={onClick}
          isSelected={selected}
          isDisabled={disabled}
        >
          {children}
        </Button>
      </div>
    </Tooltip>
  );
};
