import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Button, { ButtonGroup, ButtonProps } from '@uidu/button';
import { FieldRangeStateless } from '@uidu/field-range';
import React from 'react';
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
            iconBefore={<MagnifyingGlassMinusIcon tw="h-5 w-5" />}
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
          <div tw="w-20">
            <FieldRangeStateless
              min={min}
              max={max}
              step={0.01}
              value={[scale]}
              onChange={(value) => {
                handleScale(parseFloat(value));
              }}
            />
          </div>
          <Button
            isDisabled={scale >= 2}
            iconBefore={<MagnifyingGlassPlusIcon tw="h-5 w-5" />}
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
          <Button onClick={dismiss} iconBefore={<TrashIcon tw="h-5 w-5" />} />
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
