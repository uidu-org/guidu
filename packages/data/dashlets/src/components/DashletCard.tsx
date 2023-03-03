import React from 'react';

export default function DashletCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      tw="[background:rgb(var(--body-on-primary-bg))] border rounded overflow-hidden h-full flex-col flex"
      className={className}
    >
      {children}
    </div>
  );
}
