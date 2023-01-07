import React, { ReactNode } from 'react';

export default function Strike({ children }: { children: ReactNode }) {
  return <span tw="line-through">{children}</span>;
}
