import React, { forwardRef } from 'react';
import { ButtonItemProps } from '../types';
import BaseItem from './base-item';
import { BaseItemWrapper } from './styled';

const ButtonItem = forwardRef<HTMLElement, ButtonItemProps>(
  // Type needed on props to extract types with extract react types.
  (props: ButtonItemProps, ref) => {
    const {
      children,
      description,
      iconAfter,
      iconBefore,
      isDisabled = false,
      isSelected = false,
      onClick,
      testId,
      overrides,
      onMouseDown,
      ...others
    } = props;
    const onMouseDownHandler = onMouseDown;

    if (!children) {
      return null;
    }

    const Container = 'span';

    return (
      <BaseItemWrapper
        type={isDisabled ? undefined : 'button'}
        isSelected={isSelected}
        isDisabled={isDisabled}
        data-testid={testId}
        onClick={isDisabled ? undefined : onClick}
        // onMouseDown={onMouseDownHandler}
        ref={ref}
        {...others}
      >
        <BaseItem
          overrides={overrides}
          iconBefore={iconBefore}
          iconAfter={iconAfter}
          description={description}
        >
          {children}
        </BaseItem>
      </BaseItemWrapper>
    );
  },
);

export default ButtonItem;
