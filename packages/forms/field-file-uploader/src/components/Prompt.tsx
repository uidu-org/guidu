import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { WrapperProps } from '@uidu/field-base';
import React from 'react';
import { DropzoneRef } from 'react-dropzone';

export type PromptProps = {
  open: DropzoneRef['open'];
};

export default function Prompt({
  open,
  label,
  help,
}: PromptProps & WrapperProps) {
  return (
    <div tw="flex flex-col items-center">
      <div>
        <CloudArrowUpIcon tw="h-8 w-8" />
      </div>
      {label && <p tw="font-medium mb-0 mt-1">{label}</p>}
      {help && <p tw="text-sm text-muted mt-2">{help}</p>}
    </div>
  );
}
