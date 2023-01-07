import React, { ReactNode } from 'react';

export default function TextColor({
  color,
  children,
}: {
  color: string;
  children: ReactNode;
}) {
  return <span style={{ color }}>{children}</span>;
}
