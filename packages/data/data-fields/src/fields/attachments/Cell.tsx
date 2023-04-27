import { CellContext } from '@tanstack/react-table';
import React from 'react';

export default function Cell(
  props: CellContext<any, { id: string; url: string }[]>,
) {
  const { getValue } = props;
  const value = getValue();

  if (!value) {
    return null;
  }

  if (!Array.isArray(value)) {
    console.log('offending value', value);
    return null;
  }

  return (
    <div>
      {(value || []).map((attachment) => (
        <div tw="h-5 rounded" key={attachment.id}>
          <img src={attachment.url} tw="h-full rounded" alt={attachment.id} />
        </div>
      ))}
    </div>
  );
}
