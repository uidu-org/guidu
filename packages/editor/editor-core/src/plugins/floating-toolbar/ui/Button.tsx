import Button from '@uidu/button';
import Tooltip from '@uidu/tooltip';
import React from 'react';

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
  tooltipContent?: React.ReactNode;
  testId?: string;
}

export default function FloatingToolbarButton({
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
  tooltipContent,
  testId,
}: Props) {
  return (
    <Tooltip
      content={tooltipContent || title}
      hideTooltipOnClick
      position="top"
    >
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <Button
          className={className}
          aria-label={title}
          spacing="compact"
          href={href}
          target={target}
          appearance={appearance}
          aria-haspopup
          iconBefore={icon || undefined}
          iconAfter={iconAfter}
          onClick={onClick}
          isSelected={selected}
          isDisabled={disabled}
          // testId={testId}
        >
          {children}
        </Button>
      </div>
    </Tooltip>
  );
}
