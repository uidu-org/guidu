import React, { ReactNode } from 'react';
import { UploadCloud } from 'react-feather';

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
          <UploadCloud size={48} strokeWidth={1} />
        </div>
        {label && <p tw="font-bold mb-0 mt-2">{label}</p>}
        {help && <p tw="text-sm text-muted mt-2">{help}</p>}
      </div>
      {errors.length ? <p tw="text-red-500">{errors.join(', ')}</p> : null}
    </>
  );
}
