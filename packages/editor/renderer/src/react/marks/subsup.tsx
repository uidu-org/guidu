import React, { ReactNode } from 'react';

export type SubSupType = 'sub' | 'sup';

const isSub = (type: SubSupType): type is 'sub' => type === 'sub';

export default function SubSup({
  type,
  children,
}: {
  type: SubSupType;
  children: ReactNode;
}) {
  if (isSub(type)) {
    return <sub>{children}</sub>;
  }

  return <sup>{children}</sup>;
}
