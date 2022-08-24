import { CheckIcon } from '@heroicons/react/24/outline';
import { ButtonItem, ButtonItemProps } from '@uidu/menu';
import React from 'react';
import tw from 'twin.macro';
import { OptionProps } from '../types';

function ControlOption(
  props: OptionProps & { iconBefore: ButtonItemProps['iconBefore'] },
) {
  const { iconBefore, children, innerProps, isFocused, isSelected, innerRef } =
    props;

  return (
    <ButtonItem
      {...innerProps}
      ref={innerRef}
      isSelected={isFocused || isSelected}
      iconBefore={iconBefore}
    >
      {children}
    </ButtonItem>
  );
}

function Square({ children = null, isSelected = false }) {
  return (
    <div
      css={[
        tw`flex items-center justify-center w-5 h-5 border rounded`,
        isSelected ? tw`bg-primary` : tw`bg-gray-100`,
      ]}
    >
      {children}
    </div>
  );
}

function Circle({ children = null, isSelected = false }) {
  return (
    <div
      css={[
        tw`flex items-center justify-center w-5 h-5 border rounded-full`,
        isSelected ? tw`bg-primary` : tw`bg-gray-100`,
      ]}
    >
      {children}
    </div>
  );
}

export function CheckboxOption(props: OptionProps) {
  const { isSelected } = props;
  return (
    <ControlOption
      iconBefore={
        isSelected ? (
          <Square isSelected>
            <CheckIcon tw="h-4 w-4 text-white" />
          </Square>
        ) : (
          <Square />
        )
      }
      {...props}
    />
  );
}

export function RadioOption(props: OptionProps) {
  const { isSelected } = props;
  return (
    <ControlOption
      iconBefore={
        isSelected ? (
          <Circle isSelected>
            <CheckIcon tw="h-4 w-4 text-white" />
          </Circle>
        ) : (
          <Circle />
        )
      }
      {...props}
    />
  );
}
