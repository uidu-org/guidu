import Button from '@uidu/button';
import { Wrapper } from '@uidu/field-base';
import Popup from '@uidu/popup';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
// import 'react-colorful/dist/index.css';
import styled from 'styled-components';
import { FieldColorPickerProps } from '../types';

const Swatch = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  width: 100%;
  height: 100%;
`;

function DefaultTrigger(props) {
  const { toggleDialog, value, consumerRef, forwardedRef, ...rest } = props;
  useImperativeHandle(forwardedRef, () => consumerRef.current);
  return (
    <Button
      {...rest}
      ref={consumerRef}
      type="button"
      onClick={toggleDialog}
      tw="absolute left[2px] inset-y-0.5 flex items-center w-12 z-50 rounded-r-none"
      style={{
        backgroundColor: value,
      }}
    ></Button>
  );
}

const DefaulTriggerRef = forwardRef((props: FieldColorPickerProps, ref) => (
  <DefaultTrigger {...props} consumerRef={ref} />
));

function FieldColorPicker({
  onSetValue,
  onChange,
  name,
  value,
  trigger: Trigger = DefaulTriggerRef,
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
  forwardedRef,
  ...rest
}: FieldColorPickerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = ({ hex }) => {
    onSetValue(hex);
    onChange(name, hex);
  };

  const content = (
    <div style={{ width: 208, padding: 4 }} className="ignore-onclickoutside">
      <HexColorPicker
        color={value}
        onChange={(c) => handleChange({ hex: c })}
      />
      <div tw="grid grid-cols-4 my-1 gap-1 h-24">
        {colors.map((color, index) => (
          <Swatch
            key={index}
            color={color as string}
            onClick={() => handleChange({ hex: color })}
          />
        ))}
      </div>
    </div>
  );

  return (
    <Wrapper {...rest}>
      <div tw="relative flex">
        <Popup
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          placement="bottom-end"
          content={() => <>{content}</>}
          trigger={(triggerProps) => (
            <>
              <Trigger
                {...triggerProps}
                value={value}
                forwardedRef={forwardedRef}
                toggleDialog={(e) => {
                  e.preventDefault();
                  setDialogOpen(!dialogOpen);
                }}
              />
            </>
          )}
        />
        <div tw="relative">
          <span tw="absolute left-11 inset-y-0 px-5 flex items-center text-gray-500">
            #
          </span>
          <HexColorInput
            tw="background[rgb(var(--body-on-primary-bg))] shadow-sm focus:--tw-ring-color[rgba(var(--brand-primary), .1)] focus:ring-2 focus:border-color[rgb(var(--brand-primary))] block w-full border border-color[rgb(var(--border))] rounded py-3 px-4 placeholder-gray-400 disabled:opacity-50 disabled:background[rgba(var(--brand-subtle), .4)] pl-20"
            color={value}
            onChange={(c) => handleChange({ hex: c })}
          />
        </div>
      </div>
    </Wrapper>
  );
}

export default forwardRef((props: FieldColorPickerProps, ref) => (
  <FieldColorPicker {...props} forwardedRef={ref} />
));
