import React from 'react';
import { DashletHeaderProps } from './types';

export default function DashletHeader(props: DashletHeaderProps) {
  const { name, description, isCard, children } = props;

  const className = isCard ? 'card-header ' : 'py-3 ';
  return (
    <div
      className={`${className}d-flex align-items-center justify-content-between`}
    >
      <div>
        <h5 className="card-title h6 m-0">{name}</h5>
        {description && <p className="text-muted mb-0">{description}</p>}
      </div>
      {children}
    </div>
  );
}
