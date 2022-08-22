import { ExclamationCircleIcon } from '@heroicons/react/solid';
import React from 'react';
import { StyledAddon } from '../../styled';
import { ErrorIconProps } from './types';

export default function ErrorIcon({ fieldState }: ErrorIconProps) {
  return (
    <StyledAddon key={fieldState.error.type}>
      <ExclamationCircleIcon tw="h-5 text-red-500 px-4" />
    </StyledAddon>
  );
}
