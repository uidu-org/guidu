import React from 'react';

export type LoadingRowProps = {
  components: Record<string, any>;
  start?: number;
  size?: number;
};

export default function LoadingRow({
  components,
  start,
  size,
}: LoadingRowProps) {
  const { StyledRow } = components;
  return (
    <StyledRow start={start} size={size}>
      <div tw="h-full w-full bg-gray-50 flex items-center p-4">Loading...</div>
    </StyledRow>
  );
}
