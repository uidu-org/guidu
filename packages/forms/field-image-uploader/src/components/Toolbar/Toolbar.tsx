import Button, { ButtonGroup, ButtonProps } from '@uidu/button';
import { FieldRangeStateless } from '@uidu/field-range';
import React from 'react';
import { Trash, ZoomIn, ZoomOut } from 'react-feather';
import { zoom, ZoomDirectionType } from '../../utils';
import StyledToolbar from './styled';

export interface ToolbarProps {
  isHovered: boolean;
  confirm?: ButtonProps['onClick'];
  dismiss?: ButtonProps['onClick'];
  label?: string;
  scale: number;
  handleScale?: (scale: number) => void;
}

export default function Toolbar({
  scale,
  handleScale,
  confirm,
  dismiss,
  isHovered,
  label,
}: ToolbarProps) {
  const zoomStep = 0.1;
  const min = 1;
  const max = 2;

  return (
    <StyledToolbar
      tw="border-t rounded-b flex flex-row shadow-lg p-4"
      isHovered={isHovered}
    >
      {handleScale && (
        <div tw="space-x-3 flex items-center">
          <Button
            isDisabled={scale <= 1}
            iconBefore={<ZoomOut size={16} />}
            onClick={() =>
              zoom({
                direction: ZoomDirectionType.OUT,
                scale,
                step: zoomStep,
                min,
                max,
                callbackFn: handleScale,
              })
            }
          />
          <FieldRangeStateless
            min={min}
            max={max}
            step={0.01}
            value={scale}
            onChange={(value) => {
              handleScale(parseFloat(value));
            }}
          />
          <Button
            isDisabled={scale >= 2}
            iconBefore={<ZoomIn size={16} />}
            onClick={() => {
              zoom({
                direction: ZoomDirectionType.IN,
                scale,
                step: zoomStep,
                min,
                max,
                callbackFn: handleScale,
              });
            }}
          />
        </div>
      )}
      <div tw="ml-auto flex items-center">
        <ButtonGroup>
          <Button onClick={dismiss} iconBefore={<Trash size={16} />} />
          {label && (
            <Button onClick={confirm} appearance="primary">
              {label}
            </Button>
          )}
        </ButtonGroup>
      </div>
    </StyledToolbar>
  );
}
