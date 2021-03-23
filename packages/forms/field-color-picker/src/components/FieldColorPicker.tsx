import { Wrapper } from '@uidu/field-base';
import Popup from '@uidu/popup';
import React, { forwardRef, useState } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
// import 'react-colorful/dist/index.css';
import styled from 'styled-components';
import { FieldColorPickerProps } from '../types';

const Swatch = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  width: 100%;
  height: 100%;
`;

function DefaultTrigger({ triggerProps, toggleDialog, value, forwardedRef }) {
  return (
    <button
      {...triggerProps}
      className="btn btn-sm border p-0 d-block"
      type="button"
      onClick={toggleDialog}
      ref={forwardedRef}
    >
      <div
        style={{
          backgroundColor: value,
          width: '3rem',
          height: '1.5rem',
          borderRadius: '2px',
        }}
      />
    </button>
  );
}

function FieldColorPicker({
  onSetValue,
  onChange,
  name,
  value,
  trigger: Trigger = DefaultTrigger,
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
      <div
        style={{
          display: 'grid',
          gridGap: '4px',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gridTemplateRows: 'auto',
          margin: '4px 0',
          height: '90px',
        }}
      >
        {colors.map((color, index) => (
          <Swatch
            key={index}
            color={color}
            onClick={() => handleChange({ hex: color })}
          />
        ))}
      </div>
      <div
        style={{
          padding: '4px 0 0',
          margin: '4px 0 0',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="input-group input-group-sm">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              #
            </span>
          </div>

          <HexColorInput
            className="form-control"
            color={value}
            onChange={(c) => handleChange({ hex: c })}
          />
        </div>
      </div>
    </div>
  );

  return (
    <Wrapper {...rest}>
      <Popup
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        content={() => <>{content}</>}
        trigger={(triggerProps) => (
          <Trigger
            triggerProps={triggerProps}
            value={value}
            forwardedRef={forwardedRef}
            toggleDialog={() => setDialogOpen(!dialogOpen)}
          />
        )}
      />
    </Wrapper>
  );
}

export default forwardRef((props: FieldColorPickerProps, ref) => (
  <FieldColorPicker {...props} forwardedRef={ref} />
));
