import { CellContext } from '@tanstack/react-table';
import React from 'react';

export default function Cell<T>({ getValue }: CellContext<T, number>) {
  return (
    <div tw="relative pt-1 w-full">
      <div tw="overflow-hidden h-2 text-xs flex rounded background[rgba(var(--brand-primary), .1)]">
        <div
          style={{ width: `${getValue() * 100}%` }}
          role="progressbar"
          aria-valuenow={getValue() * 100}
          aria-valuemin={0}
          aria-valuemax={100}
          tw="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center background[rgba(var(--brand-primary), .6)]"
        />
      </div>
    </div>
  );
}
