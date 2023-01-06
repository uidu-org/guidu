import { IndentationMarkAttributes } from '@uidu/adf-schema';
import React, { ReactNode } from 'react';

interface Props extends IndentationMarkAttributes {
  children: ReactNode;
}

export default function Indentation({ children, level }: Props) {
  return (
    <div
      className="fabric-editor-block-mark fabric-editor-indentation-mark"
      data-level={level}
    >
      {children}
    </div>
  );
}
