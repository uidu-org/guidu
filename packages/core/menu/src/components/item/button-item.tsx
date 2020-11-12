/** @jsxImportSource @emotion/react */
import { CSSObject } from '@emotion/react';
import React, { forwardRef, Ref } from 'react';
import { ButtonItemProps } from '../types';
import { useBlurOnMouseDown } from '../utils/use-blur-on-mouse-down';
import BaseItem from './base-item';
import { buttonItemCSS } from './styles';

const ButtonItem = forwardRef<HTMLElement, ButtonItemProps>(
  // Type needed on props to extract types with extract react types.
  (props: ButtonItemProps, ref) => {
    const {
      children,
      cssFn = (currentStyles: CSSObject) => currentStyles,
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
    const onMouseDownHandler = useBlurOnMouseDown(onMouseDown);

    if (!children) {
      return null;
    }

    const Container = 'span';

    return (
      <span
        type={isDisabled ? undefined : 'button'}
        css={cssFn(buttonItemCSS(isDisabled, isSelected), {
          isSelected,
          isDisabled,
        })}
        data-testid={testId}
        onClick={isDisabled ? undefined : onClick}
        onMouseDown={onMouseDownHandler}
        ref={ref as Ref<HTMLButtonElement>}
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
      </span>
    );
  },
);

export default ButtonItem;
