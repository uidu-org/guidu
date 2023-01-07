import React, { ReactNode } from 'react';

export default function Underline({ children }: { children: ReactNode }) {
  return <u>{children}</u>;
}
