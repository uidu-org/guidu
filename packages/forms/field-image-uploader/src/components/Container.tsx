import React, { forwardRef, ReactNode } from 'react';

export interface ContainerProps {
  borderRadius: number;
  children: ReactNode;
  className?: string;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ borderRadius, children, className }, ref) => {
    return (
      <div
        style={{ borderRadius }}
        ref={ref}
        tw="relative"
        className={className}
      >
        {children}
      </div>
    );
  },
);

export default Container;
