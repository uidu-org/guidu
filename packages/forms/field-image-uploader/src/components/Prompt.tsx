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
          <CloudArrowUpIcon tw="h-12 w-12" />
        </div>
        {label && <p tw="font-bold mb-0 mt-2">{label}</p>}
        {help && <p tw="text-sm text-muted mt-2">{help}</p>}
      </div>
      {errors.length ? <p tw="text-red-500">{errors.join(', ')}</p> : null}
    </>
  );
}
