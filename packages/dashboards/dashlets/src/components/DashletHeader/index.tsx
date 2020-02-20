import React from 'react';
import { DashletHeaderProps } from './types';

export default function DashletHeader(props: DashletHeaderProps) {
  const { name, description, children } = props;
  return (
    <div className="card-header border-0 pt-4 d-flex align-items-center justify-content-between">
      <div>
        <h5 className="card-title h6 m-0">{name}</h5>
        {description && <p className="text-muted mb-0">{description}</p>}
      </div>
      {children}
    </div>
  );
}
