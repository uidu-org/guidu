import Button, { ButtonProps } from '@uidu/button';
import Tooltip, { PositionType } from '@uidu/tooltip';
import React, { forwardRef, Ref } from 'react';

export type Props = {
  hideTooltip?: boolean;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  selected?: boolean;
  spacing?: 'default' | 'compact' | 'none';
  target?: string;
  title?: React.ReactNode;
  titlePosition?: PositionType;
  forwardedRef?: React.Ref<HTMLButtonElement>;
} & Pick<
  ButtonProps,
  | 'aria-label'
  | 'className'
  | 'iconAfter'
  | 'iconBefore'
  | 'children'
  | 'disabled'
  | 'appearance'
>;

function ToolbarButton({
  className = '',
  titlePosition = 'top' as PositionType,
  disabled,
  onClick,
  selected,
  spacing,
  hideTooltip,
  href,
  iconAfter,
  iconBefore,
  target,
  title,
  children,
  forwardedRef,
  ...rest
}: Props) {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };
  const button = (
    <Button
      ref={forwardedRef}
      aria-haspopup
      className={className}
      href={href}
      iconAfter={iconAfter}
      iconBefore={iconBefore}
      isDisabled={disabled}
      isSelected={selected}
      onClick={handleClick}
      spacing={spacing || 'default'}
      target={target}
      shouldFitContainer
      appearance={selected ? 'primary' : 'subtle'}
      tw="h-10!"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </Button>
  );

  const tooltipContent = !hideTooltip ? title : null;

  return title ? (
    <Tooltip
      content={tooltipContent}
      hideTooltipOnClick
      position={titlePosition}
      delay={0}
    >
      {button}
    </Tooltip>
  ) : (
    button
  );
}

export default forwardRef((props: Props, ref: Ref<HTMLButtonElement>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ToolbarButton {...props} forwardedRef={ref} />
)) as React.ComponentType<Props>;
