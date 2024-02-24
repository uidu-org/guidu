import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import React, { ReactNode } from 'react';

export interface PromptProps {
  label: ReactNode;
  help: ReactNode;
  errors: string[];
}

export default function Prompt({ label, help, errors }: PromptProps) {
  return (
    <>
      <div tw="flex flex-col items-center">
        <div>
          <CloudArrowUpIcon tw="h-8 w-8" />
        </div>
        {label && <p tw="font-medium mb-0 mt-1">{label}</p>}
        {help && <p tw="text-sm text-muted mt-2">{help}</p>}
      </div>
      {errors.length ? <p tw="text-red-500">{errors.join(', ')}</p> : null}
    </>
  );
}
