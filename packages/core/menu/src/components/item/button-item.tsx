import React, { forwardRef, Ref } from 'react';
import tw from 'twin.macro';
import { ButtonItemProps } from '../types';
import { useBlurOnMouseDown } from '../utils/use-blur-on-mouse-down';
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
    const onMouseDownHandler = useBlurOnMouseDown(onMouseDown);

    if (!children) {
      return null;
    }

    const Container = 'span';

    return (
      <BaseItemWrapper
        type={isDisabled ? undefined : 'button'}
        css={[tw`w-full m-0 bg-transparent border-0 outline-none`]}
        // css={cssFn(buttonItemCSS(isDisabled, isSelected), {
        //   isSelected,
        //   isDisabled,
        // })}
        isSelected={isSelected}
        isDisabled={isDisabled}
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
      </BaseItemWrapper>
    );
  },
);

export default ButtonItem;
