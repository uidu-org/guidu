import { XMarkIcon } from '@heroicons/react/24/outline';
import Button, { ButtonProps } from '@uidu/button';
import { noop, StyledInput, useController, Wrapper } from '@uidu/field-base';
import Popup, { TriggerProps } from '@uidu/popup';
import React, {
  forwardRef,
  Key,
  MouseEvent,
  useCallback,
  useState,
} from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { AnyColor } from 'react-colorful/dist/types';
// import 'react-colorful/dist/index.css';
import styled from 'styled-components';
import tw from 'twin.macro';
import { FieldColorPickerProps } from '../types';

const HexColorPickerWrapper = styled.div`
  ${tw`p-1`}
  .react-colorful__saturation {
    ${tw`rounded-t`}
  }
  .react-colorful__last-control {
    ${tw`rounded-b`}
  }
`;

const Swatch = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  width: 100%;
  height: 100%;
`;

const DefaulTrigger = forwardRef<
  HTMLButtonElement,
  FieldColorPickerProps & { toggleDialog: ButtonProps['onClick'] }
>(({ toggleDialog, value, ...rest }, ref) => (
  <Button
    {...rest}
    ref={ref}
    tabIndex={-1}
    type="button"
    onClick={toggleDialog}
    tw="absolute [left:2px] [top:2px] [bottom:2px] flex items-center w-12 z-50 [border-color:rgb(var(--border))] focus:(outline-none ring-0) rounded cursor-pointer"
    style={{
      backgroundColor: value,
    }}
  />
));

export default function FieldColorPicker({
  name,
  value: defaultValue,
  onChange = noop,
  trigger: Trigger = DefaulTrigger,
  className,
  colors = [
    '#FF6900',
    '#FCB900',
    '#7BDCB5',
    '#00D084',
    '#8ED1FC',
    '#0693E3',
    '#ABB8C3',
    '#EB144C',
    '#F78DA7',
    '#9900EF',
  ],
  showInput = true,
  popupProps = {},
  label,
  ...rest
}: FieldColorPickerProps) {
  const { field, fieldState, wrapperProps, id } = useController({
    name,
    defaultValue: defaultValue || '',
    onChange,
    ...rest,
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = useCallback(
    ({ hex }: { hex: AnyColor }) => {
      field.onChange(hex);
      onChange(name, hex);
    },
    [field, name, onChange],
  );

  const Content = useCallback(
    () => (
      <div style={{ width: 208 }} className="ignore-onclickoutside">
        <div tw="flex items-center justify-between border-b py-1 px-2">
          <div>{label}</div>
          <Button
            onClick={() => setDialogOpen(false)}
            iconBefore={<XMarkIcon tw="h-4 w-4" />}
            appearance="link"
          />
        </div>
        <HexColorPickerWrapper>
          <HexColorPicker
            color={field.value}
            onChange={(c: AnyColor) => handleChange({ hex: c })}
          />
        </HexColorPickerWrapper>
        <div tw="grid grid-cols-4 gap-1 h-24 p-1 border-t">
          {colors.map((color) => (
            <Swatch
              tw="rounded"
              key={color as Key}
              color={color as string}
              onClick={() => handleChange({ hex: color })}
            />
          ))}
        </div>
      </div>
    ),
    [colors, handleChange, field.value, label],
  );

  const CachedTrigger = useCallback(
    (triggerProps: TriggerProps) => (
      <Trigger
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...triggerProps}
        value={field.value}
        ref={(e) => {
          if (e) {
            triggerProps.ref(e);
            field.ref(e);
          }
        }}
        toggleDialog={(e: MouseEvent) => {
          e.preventDefault();
          setDialogOpen(!dialogOpen);
        }}
      />
    ),
    [Trigger, field, dialogOpen, setDialogOpen],
  );

  return (
    <Wrapper {...wrapperProps} label={label}>
      <div tw="relative">
        <Popup
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...popupProps}
          zIndex={999}
          content={Content}
          trigger={CachedTrigger}
        />
        {showInput && (
          <div tw="relative">
            <span tw="absolute left-11 inset-y-0 px-5 flex items-center text-gray-500">
              #
            </span>
            <StyledInput
              {...field}
              className={className}
              type="text"
              $hasError={!!fieldState?.error}
              as={HexColorInput}
              tw="pl-20"
              color={field.value}
              id={id}
              onChange={(c) => handleChange({ hex: c })}
            />
          </div>
        )}
      </div>
    </Wrapper>
  );
}
