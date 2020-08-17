import React, { ReactNode } from 'react';

export default function ReadmeDescription({
  children,
}: {
  children: ReactNode;
}) {
  const style = { marginTop: 12 };

  return typeof children === 'string' ? (
    <p>{children}</p>
  ) : (
    <div style={style}>{children}</div>
  );
}
